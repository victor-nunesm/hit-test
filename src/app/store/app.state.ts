import { CoreActions, coreReducer, CoreState } from './core'
import { TeamActions, teamReducer, TeamState } from './team'

// all state properties must be initialized here in order to use storage persistance
export class AppState {
  core = {} as CoreState
  team = {} as TeamState
}

export const reducers = {
  core: coreReducer,
  team: teamReducer,
}
export const metaReducers = []
export const effects = []

export type AppActions = CoreActions | TeamActions
