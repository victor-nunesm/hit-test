import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from '@layout/components/layout.component'
import { APP_ROUTES, AuthGuard } from './core'

const routes: Routes = [
  // {
  //   path: APP_ROUTES.login,
  //   loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
  //   canActivate: [IsLoggedInGuard],
  // },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: APP_ROUTES.table,
        loadChildren: () => import('./pages/table/table.module').then((m) => m.TableModule),
        canActivate: [AuthGuard],
      },
      {
        path: APP_ROUTES.cardsGrid,
        loadChildren: () => import('./pages/card-list/card-list.module').then((m) => m.CardListModule),
        canActivate: [AuthGuard],
      },
      { path: '', redirectTo: APP_ROUTES.table, pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: APP_ROUTES.table, pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
