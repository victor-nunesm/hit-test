import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbListModule,
  NbPopoverModule,
  NbUserModule,
} from '@nebular/theme'
import { HitDatepickerModule, HitInputModule } from '@shared/components'
import { LayoutHeaderComponent } from './layout-header.component'

@NgModule({
  declarations: [LayoutHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NbPopoverModule,
    NbCardModule,
    NbListModule,
    NbIconModule,
    FormsModule,
    ReactiveFormsModule,
    NbUserModule,
    NbContextMenuModule,
    HitInputModule,
    HitDatepickerModule,
  ],
  exports: [LayoutHeaderComponent],
})
export class LayoutHeaderModule {}
