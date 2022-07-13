import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { BasePagination } from '@core/models'
import { assignMenuActionId, TableActionClick } from '@shared/components'
import { HitCrudListComponent } from '@shared/components/hit-crud-list/hit-crud-list.component'
import { TableStateService } from '@store/table'
import { catchError, take, takeUntil, throwError } from 'rxjs'
import { TABLE_ACTIONS, TABLE_COLUMNS } from './constants'
import { TableService } from './table.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent extends HitCrudListComponent implements OnInit {
  override paginated = false
  override createEntityRoute = ''
  override tableColumns = TABLE_COLUMNS
  override tableActions = assignMenuActionId(TABLE_ACTIONS)

  constructor(
    private state: TableStateService,
    private service: TableService,
    override route: ActivatedRoute,
    override router: Router
  ) {
    super(router, route)
  }

  ngOnInit(): void {
    this.stateLoadingListener()
    this.getData()
  }

  handleTableActionMenuItemClicked(event: TableActionClick) {
    const {
      bag: { item },
      data,
    } = event
    this.state.setCurrent(data)

    for (const actionName in TABLE_ACTIONS) {
      if (Object.prototype.hasOwnProperty.call(TABLE_ACTIONS, actionName)) {
        const currAction = TABLE_ACTIONS[actionName]

        switch (currAction.title) {
          case TABLE_ACTIONS.edit.title:
            // this.navigate([this.routes.tableEdit.replace(':id', data.id)])
            break

          case TABLE_ACTIONS.delete.title:
            break

          default:
            break
        }
      }
    }
  }

  private getData(pagination?: BasePagination) {
    this.state.setLoading(true)
    this.service
      .getAll()
      .pipe(
        take(1),
        catchError((err) => {
          return throwError(() => new Error(JSON.stringify(err)))
        })
      )
      .pipe()
      .subscribe((data) => {
        this.data = data
        this.state.setLoading(false)
      })
  }

  private stateLoadingListener() {
    this.state
      .getLoadingState()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((loading) => (this.loading = loading))
  }
}
