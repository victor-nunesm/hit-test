import { User } from '@core/models'
import { Action } from '@ngrx/store'
import { CoreState } from './models'

export const SET_CORE_STATE = '[CORE_STATE] Set Core State'
export const SET_AUTHENTICATED_USER = '[CORE_STATE] Set Authenticated User'
export const SET_IS_LOADING = '[CORE_STATE] Set Core Loading'

export class SetCoreState implements Action {
  readonly type = SET_CORE_STATE
  payload: Partial<CoreState>

  constructor(payload: Partial<CoreState>) {
    this.payload = payload
  }
}

export class SetAuthenticatedUser implements Action {
  readonly type = SET_AUTHENTICATED_USER
  payload: User

  constructor(payload: User) {
    this.payload = payload
  }
}

export class SetIsLoading implements Action {
  readonly type = SET_IS_LOADING
  payload: boolean

  constructor(payload: boolean) {
    this.payload = payload
  }
}

export type CoreActions = SetAuthenticatedUser | SetIsLoading | SetCoreState
