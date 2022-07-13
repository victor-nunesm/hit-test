import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme'
import { HitInputModule } from '../hit-input'
import { HitTableModule } from '../hit-table'
import { HitCrudListComponent } from './hit-crud-list.component'

@NgModule({
  declarations: [HitCrudListComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    HitTableModule,
    HitInputModule,
  ],
  exports: [
    RouterModule,
    FormsModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    HitTableModule,
    HitInputModule,
    HitCrudListComponent,
  ],
})
export class HitCrudListModule {}
