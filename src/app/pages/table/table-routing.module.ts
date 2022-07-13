import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'
import { JsonDataResolver } from '@core/resolvers'
import { TableComponent } from './table.component'

const routes: Route[] = [{ path: '', component: TableComponent, resolve: { data: JsonDataResolver } }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
