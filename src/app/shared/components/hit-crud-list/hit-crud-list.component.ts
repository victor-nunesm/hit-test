import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core'
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router'
import { APP_ROUTES } from '@core/constants'
import { BasePagination } from '@core/models'
import { NbMenuItem } from '@nebular/theme'
import { Subject } from 'rxjs'
import { HitInputComponent } from '../hit-input'
import { CustomColumn, HitTableComponent, TableActionClick, TableColumn } from '../hit-table'
import { CrudListTeam } from './models'

@Component({
  selector: 'hit-crud-list',
  templateUrl: './hit-crud-list.component.html',
  styleUrls: ['./hit-crud-list.component.scss'],
})
export class HitCrudListComponent implements OnDestroy {
  @ViewChild(HitTableComponent) table: HitTableComponent
  @ViewChild(HitInputComponent) filter: HitInputComponent
  @Input() paginated = false
  @Input() showHeader = true
  @Input() tableColumns: TableColumn[] = []
  @Input() customColumns: CustomColumn[] = []
  @Input() tableActions: NbMenuItem[]
  @Input() data: CrudListTeam<any> = []

  @Input() createEntityRoute = ''
  @Input() loading = false
  @Input() filterValue = ''
  @Input() filterPlaceholder = 'Filtrar itens da tabela'

  @Output() actionOptionClicked = new EventEmitter<TableActionClick>()
  @Output() paginationChanged = new EventEmitter<BasePagination>()

  unsubscribe$ = new Subject<void>()
  routes = APP_ROUTES

  constructor(public router: Router, public route: ActivatedRoute) {}

  navigate(route: string[], extras: Partial<NavigationExtras> = {}) {
    this.router.navigate(route, { relativeTo: this.route, ...extras })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
