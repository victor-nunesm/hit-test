import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'
import { CardListComponent } from './card-list.component'

const routes: Route[] = [{ path: '', component: CardListComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardListRoutingModule {}
