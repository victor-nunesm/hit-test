import { CoreActions, coreReducer, CoreState } from './core'
import { TableActions, tableReducer, TableState } from './table'

// all state properties must be initialized here in order to use storage persistance
export class AppState {
  core = {} as CoreState
  TABLE = {} as TableState
}

export const reducers = {
  core: coreReducer,
  table: tableReducer,
}
export const metaReducers = []
export const effects = []

export type AppActions = CoreActions | TableActions
