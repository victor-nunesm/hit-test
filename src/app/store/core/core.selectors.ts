import { createFeatureSelector, createSelector } from '@ngrx/store'
import { STORE_FEATURES } from '@store/store-features'
import { CoreState } from './models'

export const selectCategorySelectionModuleState = createFeatureSelector<CoreState>(STORE_FEATURES.CORE)
export const selectCoreState = createSelector(selectCategorySelectionModuleState, _selectCoreState)

export const selectIsLoading = createSelector(selectCoreState, _selectIsLoading)
export const selectAuthenticatedUser = createSelector(selectCoreState, _selectAuthenticatedUser)

function _selectCoreState(state: CoreState) {
  return state
}
function _selectIsLoading(state: CoreState) {
  return state.isLoading
}
function _selectAuthenticatedUser(state: CoreState) {
  return state.authenticatedUser
}
