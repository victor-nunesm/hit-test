import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core'
import { APP_ROUTES } from '@core/constants'
import { User } from '@core/models'
import { AuthService } from '@core/services'
import { NbMenuItem, NbMenuService, NbSidebarState } from '@nebular/theme'
import { removeMenuEntries } from '@shared/helpers'
import { Observable, of, Subject } from 'rxjs'
import { map, switchMap, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-routes-menu',
  templateUrl: './routes-menu.component.html',
  styleUrls: ['./routes-menu.component.scss'],
})
export class RoutesMenuComponent implements OnInit, OnDestroy {
  @Output() changeSidebarState = new EventEmitter<NbSidebarState>()

  private unsubscribe$ = new Subject()
  menuItems: NbMenuItem[] = [
    {
      title: 'Tabela',
      icon: 'pie-chart-outline',
      link: `/${APP_ROUTES.table}`,
      pathMatch: 'prefix',
    },
    {
      title: 'Lista',
      icon: 'grid-outline',
      link: `/${APP_ROUTES.cardsGrid}`,
      pathMatch: 'prefix',
    },
  ]
  menuTag = 'routes-menu'
  user$: Observable<User | null>
  menuItems$: Observable<NbMenuItem[]>
  constructor(private authService: AuthService, private menuService: NbMenuService) {}

  ngOnInit() {
    this.user$ = this.getUser()
    this.menuItems$ = this.getMenuItems()
    this.menuService
      .onItemClick()
      .pipe(
        takeUntil(this.unsubscribe$),
        map((data) => {
          if (window.innerWidth < 768) {
            this.changeSidebarState.emit('collapsed')
          }
          return data
        })
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }

  private getUser(): Observable<User | null> {
    return this.authService.authenticatedUser
  }

  private getMenuItems(): Observable<NbMenuItem[]> {
    return of(this.menuItems).pipe(
      switchMap((menuItems) => this.user$.pipe(map((user) => ({ user, menuItems })))),
      map((res) => {
        // remove menu entries based on user permissions
        const { menuItems, user } = res
        const menuEntriesToRemove: string[] = []
        return removeMenuEntries(menuItems, menuEntriesToRemove)
      })
    )
  }
}
