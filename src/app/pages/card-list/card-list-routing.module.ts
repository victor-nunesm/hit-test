import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'
import { JsonDataResolver } from '@core/resolvers'
import { CardListComponent } from './card-list.component'

const routes: Route[] = [{ path: '', component: CardListComponent, resolve: { data: JsonDataResolver } }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardListRoutingModule {}
