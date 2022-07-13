import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { User } from '@core/models'
import { CoreStateService } from '@store/core'
import { BehaviorSubject, Observable, throwError } from 'rxjs'
import { catchError, filter, take, tap } from 'rxjs/operators'
import { LocalStorageService } from './localstorage.service'
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticatedUser$ = new BehaviorSubject<User | null>(undefined!)

  constructor(
    private localStorage: LocalStorageService,
    private coreState: CoreStateService,
    private userService: UserService,
    private router: Router
  ) {
    let user: User = {
      id: 1,
      name: 'José Victor',
      email: 'eu@josevictornunesmandu.com.br',
      phoneNumber: '94984444245',
      bornDate: new Date('02/01/1999'),
    }
    let password = this.localStorage.getUserPassword()
    let remmemberMe = this.localStorage.getRemmemberMe()
    // if (!user || !password || !remmemberMe) {
    if (!user) {
      this.logout()
      return
    } else {
      this._authenticatedUser$.next(user)
      this.coreState.setCore({
        authenticatedUser: user,
      })
    }
  }

  get authenticatedUser(): Observable<User | null> {
    return this._authenticatedUser$.asObservable().pipe(filter((user) => user !== undefined))
  }
  get authenticatedUserValue(): User | null {
    return this._authenticatedUser$.value
  }

  async updateAuthenticatedUser(user: User, password: string): Promise<void> {
    try {
      this.localStorage.setUserPassword(password)
      this.localStorage.setUser(user)
      this.coreState.setAuthenticatedUser(user)
      return this._authenticatedUser$.next(user)
    } catch (error) {
      console.error(error)
    }
  }

  login(data: { email: string; password: string }): Observable<User> {
    return this.userService.userLogin(data).pipe(tap((user) => this.updateAuthenticatedUser(user, data.password)))
  }

  logout() {
    this._authenticatedUser$.next(null)
    this.coreState.setCore({
      authenticatedUser: null,
    })
    this.localStorage.clear()
    this.router.navigateByUrl('login')
  }

  async loadUserFromLocalStorageAndUpdateItsData() {
    const user = this.localStorage.getUser()
    if (user) {
      this.login({ email: user.email, ...this.localStorage.getUserPassword() })
        .pipe(
          take(1),
          catchError((err) => {
            this.logout()
            return throwError(() => new Error(err.error))
          })
        )
        .subscribe()
    }
  }
}
