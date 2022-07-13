import { Injectable } from '@angular/core'
import { User } from '@core/models'
import { LocalStorageService } from '@core/services'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as actions from './core.actions'
import * as selectors from './core.selectors'
import { CoreState } from './models'

@Injectable({ providedIn: 'root' })
export class CoreStateService {
  selectors = selectors
  actions = actions

  constructor(private _store: Store<CoreState>, private localStorage: LocalStorageService) {}

  get store() {
    return this._store
  }

  getCore(): Observable<CoreState> {
    return this.store.select(selectors.selectCoreState)
  }
  setCore(core: Partial<CoreState>): void {
    this.store.dispatch(actions.setCore({ payload: core }))
  }

  getLoading(): Observable<boolean> {
    return this.store.select(selectors.selectIsLoading)
  }
  setLoading(isLoading: boolean): void {
    this.store.dispatch(actions.setIsLoading({ payload: isLoading }))
  }

  getAuthenticatedUser() {
    return this.store.select(selectors.selectAuthenticatedUser)
  }
  setAuthenticatedUser(user: User) {
    this.localStorage.setUser(user)
    this.store.dispatch(actions.setAuthenticatedUser({ payload: user }))
  }
}
