import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NbButtonModule, NbIconModule, NbLayoutModule, NbMenuModule, NbSidebarModule } from '@nebular/theme'
import { RoutesMenuModule } from '@shared/components'
import { LayoutComponent } from './components/layout.component'
import { LayoutFooterModule } from './layout-footer'
import { LayoutHeaderModule } from './layout-header'

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    LayoutHeaderModule,
    LayoutFooterModule,
    RoutesMenuModule,
    NbIconModule,
    NbButtonModule,
  ],
  exports: [LayoutHeaderModule, LayoutFooterModule, LayoutComponent],
})
export class LayoutModule {}
