import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { NbButtonModule, NbCardModule, NbContextMenuModule, NbIconModule, NbSpinnerModule } from '@nebular/theme'
import { NgxMaskModule } from 'ngx-mask'
import { HitTableComponent } from './hit-table.component'

@NgModule({
  declarations: [HitTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    NbIconModule,
    NbCardModule,
    NbButtonModule,
    NbContextMenuModule,
    NgxMaskModule,
    NbSpinnerModule,
  ],
  exports: [HitTableComponent],
})
export class HitTableModule {}
