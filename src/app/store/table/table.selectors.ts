import { Team } from '@core/models'
import { EntityState } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { STORE_FEATURES } from '@store/store-features'
import { adapter, TableState } from './table.state'

const {
  selectEntities: _selectEntities,
  selectTotal: _selectTotal,
  selectAll: _selectAll,
  selectIds: _selectIds,
} = adapter.getSelectors()
const _getCurrentId = (state: TableState) => (state.current as Team)?.time.time_id
const _getIds = (state: EntityState<Team>) => {
  const ids: number[] = []
  for (const table in state.entities) {
    if (Object.prototype.hasOwnProperty.call(state.entities, table)) {
      const data = state.entities[table]
      ids.push(data?.time.time_id as number)
    }
  }

  return ids
}
const _getCurrent = (state: TableState) => state.current as Team
const _getLoadingState = (state: TableState) => state.loading as boolean

export const selectModuleState = createFeatureSelector<TableState>(STORE_FEATURES.TABLE)
export const selectState = createSelector(selectModuleState, _selectState)

export const selectIds = createSelector(selectState, _getIds)
export const selectEntities = createSelector(selectState, _selectEntities)
export const selectAll = createSelector(selectState, _selectAll)
export const selectTotal = createSelector(selectState, _selectTotal)
export const selectCurrentId = createSelector(selectState, _getCurrentId)
export const selectCurrent = createSelector(selectState, _getCurrent)
export const getLoadingState = createSelector(selectState, _getLoadingState)

function _selectState(state: TableState) {
  return state
}
