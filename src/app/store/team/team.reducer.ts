import { Action, createReducer, on } from '@ngrx/store'
import * as ACTIONS from './team.actions'
import { adapter, initialState, TeamState } from './team.state'

const _saleReducer = createReducer(
  initialState,
  on(ACTIONS.addOne, (state, { payload }) => {
    return adapter.addOne(payload, state)
  }),
  on(ACTIONS.setOne, (state, { payload }) => {
    return adapter.setOne(payload, state)
  }),
  on(ACTIONS.setCurrent, (state, { payload }) => {
    return { ...state, current: payload }
  }),
  on(ACTIONS.removeCurrent, (state) => {
    return { ...state, current: null }
  }),
  on(ACTIONS.upsertOne, (state, { payload }) => {
    return adapter.upsertOne(payload, state)
  }),
  on(ACTIONS.addMany, (state, { payload }) => {
    return adapter.addMany(payload, state)
  }),
  on(ACTIONS.upsertMany, (state, { payload }) => {
    return adapter.upsertMany(payload, state)
  }),
  on(ACTIONS.updateOne, (state, { payload }) => {
    return adapter.updateOne(payload, state)
  }),
  on(ACTIONS.updateMany, (state, { payload }) => {
    return adapter.updateMany(payload, state)
  }),
  on(ACTIONS.mapOne, (state, { payload }) => {
    return adapter.mapOne(payload, state)
  }),
  on(ACTIONS.mapMany, (state, { payload }) => {
    return adapter.map(payload, state)
  }),
  on(ACTIONS.deleteOne, (state, { payload }) => {
    return adapter.removeOne(payload, state)
  }),
  on(ACTIONS.deleteMany, (state, { payload }) => {
    return adapter.removeMany(payload, state)
  }),
  on(ACTIONS.deleteByPredicate, (state, { payload }) => {
    return adapter.removeMany(payload, state)
  }),
  on(ACTIONS.load, (state, { payload }) => {
    return adapter.setAll(payload, state)
  }),
  on(ACTIONS.clear, (state) => {
    return adapter.removeAll({ ...state })
  }),
  on(ACTIONS.setLoading, (state, { payload }) => {
    return setLoading(state, payload)
  })
)

export function teamReducer(state: TeamState | undefined, action: Action) {
  return _saleReducer(state, action)
}

const setLoading = (state: TeamState, loading: boolean) => {
  return { ...state, loading }
}
