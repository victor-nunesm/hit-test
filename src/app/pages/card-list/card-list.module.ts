import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NbButtonGroupModule, NbButtonModule, NbCardModule } from '@nebular/theme'
import { HitInputModule } from '@shared/components'
import { SharedModule } from '@shared/shared.module'
import { CardListRoutingModule } from './card-list-routing.module'
import { CardListComponent } from './card-list.component'

@NgModule({
  declarations: [CardListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CardListRoutingModule,
    NbCardModule,
    HitInputModule,
    SharedModule,
    NbButtonModule,
    NbButtonGroupModule,
  ],
})
export class CardListModule {}
