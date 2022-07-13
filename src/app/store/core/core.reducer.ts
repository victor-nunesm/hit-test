import { Action, createReducer, on } from '@ngrx/store'
import * as actions from './core.actions'
import { initialCoreState } from './core.state'
import { CoreState } from './models'

const _coreReducer = createReducer(
  initialCoreState,
  on(actions.setCore, (state, { payload }) => ({
    ...state,
    ...payload,
  })),
  on(actions.setAuthenticatedUser, (state, { payload }) => ({
    ...state,
    authenticatedUser: payload,
  })),
  on(actions.setIsLoading, (state, { payload }) => ({
    ...state,
    isLoading: payload,
  }))
)

export function coreReducer(state: CoreState | undefined, action: Action) {
  return _coreReducer(state, action)
}
