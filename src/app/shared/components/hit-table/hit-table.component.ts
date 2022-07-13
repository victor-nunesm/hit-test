import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTable, MatTableDataSource } from '@angular/material/table'
import { BasePagination } from '@core/models'
import { NbMenuItem, NbMenuService } from '@nebular/theme'
import { CoreStateService } from '@store/core'
import { BehaviorSubject, debounceTime, Subject } from 'rxjs'
import { filter, takeUntil } from 'rxjs/operators'
import { CrudListTableData } from '../hit-crud-list'
import { CustomColumn, TableActionClick, TableColumn } from './models'

@Component({
  selector: 'hit-table',
  templateUrl: './hit-table.component.html',
  styleUrls: ['./hit-table.component.scss'],
})
export class HitTableComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input('data') data: CrudListTableData<any>
  @Input('paginated') paginated: boolean = false
  @Input('columns') columns: TableColumn[]
  @Input('actions') actions: NbMenuItem[]
  @Input('loading') loading: boolean = false
  @Input('actionsIcon') actionsIcon: string = 'options-2-outline'
  @Input('actionsIconStatus') actionsIconStatus: string = 'primary'
  @Input('actionsColumnName') actionsColumnName: string = 'Ações'
  @Input('searchInputPlaceholder') searchInputPlaceholder: string = 'Digite algo para filtrar as entradas da tabela'
  @Input('customColumns') customColumns: CustomColumn[]
  @Input('filter')
  get filter() {
    return this.dataSource?.filter || ''
  }
  set filter(value: string) {
    this.applyFilter(value)
  }

  @Output('actionOptionClicked') actionOptionClicked = new EventEmitter<TableActionClick>()
  @Output() paginationChanged = new EventEmitter<BasePagination>()
  @Output() delayedPageChanged = new BehaviorSubject<BasePagination>(null!)

  @ViewChild(MatTable) table: MatTable<any[]>
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  private unsubscribe$ = new Subject()
  private initialLoad = true
  dataSource: MatTableDataSource<any> = new MatTableDataSource()
  columnsNames: string[]
  _columns: TableColumn[]
  actionsColumnKey = 'ACTIONS_COLUMN'
  actionsMenuTag = 'TABLE_ACTION_MENU'
  isSearching = false
  formatPrice = (value: number | string): string => {
    if (value) {
      return value.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 3,
      })
    } else {
      return 'R$ 0'
    }
  }
  currentActionItem: any = null
  tableActionsPerEntryId: { [key: string]: NbMenuItem[] } = {}
  tableActionMenuTagPerEntryId: { [key: string]: string } = {}

  constructor(private menuService: NbMenuService, public coreState: CoreStateService) {}

  ngOnInit(): void {
    this.delayedPageChanged.pipe(takeUntil(this.unsubscribe$), debounceTime(500)).subscribe((page) => {
      if (page) {
        this.paginationChanged.emit(page)
      }
    })
    if (!this.columns) throw new Error('"columns" @Input() is required')
    this.columnsNames = this.columns.map((col) => col.key)
    this._columns = [...this.columns]
    if (this.actions) {
      this.columnsNames.push(this.actionsColumnKey)
      this._columns.push({ key: this.actionsColumnKey, columnName: this.actionsColumnName })
      this.actionsMenuClickEvents()
    }
    if (this.data) {
      this.updatePagination()
    }
    this.initialLoad = false
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data && this.data !== changes['data']?.previousValue) {
      this.updatePagination()
    }
  }

  ngAfterViewInit() {
    if (this.paginated) {
      this.dataSource.sort = this.sort
    } else {
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }

  updatePagination() {
    if (this.data instanceof Array) {
      this.configureActionsCache(this.data as any)
      this.dataSource.data = this.data as any
    } else if (this.data instanceof Object) {
      const headers = JSON.parse((this.data as any).response.headers.get('X-Pagination'))
      const filter = this.dataSource.filter
      const startingSliceIndex = headers.CurrentPage * headers.PageSize - headers.PageSize
      let endSlice = headers.CurrentPage === 1 ? headers.PageSize : headers.PageSize * 2
      this.configureActionsCache((this.data as any).entities)
      this.dataSource.data = !filter
        ? ((this.data as any).entities as any[]).slice(startingSliceIndex, endSlice)
        : (this.data as any).entities.filter((v) => {
            let matches = false
            let keys = Object.keys(v)
            if (v) {
              for (let i = 0; i < keys.length; i++) {
                const currValue = v[keys[i]]
                if (currValue?.toString().toLowerCase().includes(filter.toLowerCase())) {
                  matches = true
                  break
                }
              }
            }
            return matches
          })
      this.paginator.length = headers.TotalCount
      this.paginator.pageSize = headers.PageSize || 5
      this.paginator.pageIndex = headers.CurrentPage - 1 || 0
    }
  }

  _pageChanged(pageEvent: PageEvent) {
    this.paginationChanged.emit({
      pageIndex: pageEvent.pageIndex + 1,
      pageSize: pageEvent.pageSize || 10,
      // filters: Object.keys(this.dataSource.data[0]).map((key) => ({ key: key, value: [this.dataSource.filter] })),
      search: this.dataSource.filter,
    })
  }

  accessNestedPropByDotPath(obj: { [key: string]: any }, path: string): any {
    if (path.includes('[')) {
      console.log(path, obj)
      const index = +path.split('[')[1].split(']')[0]
      const pathBeforeIndex = path.split('[')[0]
      let pathAfterIndex = path.split(']')[1]
      if (pathAfterIndex[0] === '.') {
        pathAfterIndex = pathAfterIndex.slice(1)
      }

      const valBeforeIndex = pathBeforeIndex.split('.').reduce((o, p) => o[p], obj)
      const indexVal = valBeforeIndex[index]
      const valAfterIndex = pathAfterIndex.split('.').reduce((o, p) => o[p], indexVal)
      return valAfterIndex
    }
    return path.split('.').reduce((o, p) => o[p], obj)
  }

  private configureActionsCache(data: any[]) {
    data?.forEach((currData: any, idx) => {
      currData = JSON.parse(JSON.stringify(currData))
      if (!currData.id) currData.id = idx

      this.tableActionsPerEntryId[currData.id] = this.actions?.map((action) => {
        if (Object.keys(action.data).includes('disabled')) {
          const disabledFunction = action.data.disabled
          action = { ...JSON.parse(JSON.stringify(action)) }
          action.data.disabled = disabledFunction
          action.hidden = action.data.disabled(currData)
        }

        return action
      })
      this.tableActionMenuTagPerEntryId[currData.id] = this.actionsMenuTag + '-' + currData.id
    })
  }

  private actionsMenuClickEvents(): void {
    this.menuService
      .onItemClick()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((menu) => (menu.tag.includes('-') && menu.tag.split('-')[0]) === this.actionsMenuTag)
      )
      .subscribe((bag) => this.actionOptionClicked.emit({ bag, data: this.currentActionItem }))
  }

  getCurrentCustomColumn(propertyName: string): CustomColumn {
    return this.customColumns?.find((col) => col.propertyName === propertyName) as {
      propertyName: string
      templateRef: TemplateRef<any>
    }
  }

  applyFilter(value: string) {
    this.dataSource.filter = value?.trim().toLowerCase()

    if (this.dataSource && !this.dataSource.paginator && !this.initialLoad) {
      // this.dataSource.paginator.firstPage()
      this.delayedPageChanged.next({
        search: this.dataSource.filter || '',
        pageIndex: this.paginator?.pageIndex,
        pageSize: this.paginator?.pageSize || 10,
      })
    }
  }
}
