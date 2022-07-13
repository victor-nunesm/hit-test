import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { assignMenuActionId } from '@shared/components'
import { HitCrudListComponent } from '@shared/components/hit-crud-list/hit-crud-list.component'
import { TableStateService } from '@store/table'
import { TABLE_ACTIONS, TABLE_COLUMNS } from './constants'

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

  constructor(private state: TableStateService, override route: ActivatedRoute, override router: Router) {
    super(router, route)
  }

  ngOnInit(): void {
    this.loading = false
    this.data = this.route.snapshot.data['data']
  }
}
