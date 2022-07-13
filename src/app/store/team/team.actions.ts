import { Team } from '@core/models'
import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity'
import { createAction, props } from '@ngrx/store'

export const load = createAction('[team_STATE_SERVICE] Load team', props<{ payload: Team[] }>())
export const setLoading = createAction('[team_STATE_SERVICE] Set team Loading', props<{ payload: boolean }>())
export const setCurrent = createAction('[team_STATE_SERVICE] Set Current team', props<{ payload: Team }>())
export const removeCurrent = createAction('[team_STATE_SERVICE] Remove Current team')
export const setMany = createAction('[team_STATE_SERVICE] Set team', props<{ payload: Team[] }>())
export const addOne = createAction('[team_STATE_SERVICE] Add team', props<{ payload: Team }>())
export const setOne = createAction('[team_STATE_SERVICE] Set team', props<{ payload: Team }>())
export const upsertOne = createAction('[team_STATE_SERVICE] Upsert team', props<{ payload: Team }>())
export const addMany = createAction('[team_STATE_SERVICE] Add team', props<{ payload: Team[] }>())
export const upsertMany = createAction('[team_STATE_SERVICE] UpsertMany team', props<{ payload: Team[] }>())
export const updateOne = createAction('[team_STATE_SERVICE] Update team', props<{ payload: Update<Team> }>())
export const updateMany = createAction('[team_STATE_SERVICE] Update team', props<{ payload: Update<Team>[] }>())
export const mapOne = createAction('[team_STATE_SERVICE] Map team', props<{ payload: EntityMapOne<Team> }>())
export const mapMany = createAction('[team_STATE_SERVICE] Map team', props<{ payload: EntityMap<Team> }>())
export const deleteOne = createAction('[team_STATE_SERVICE] Delete team', props<{ payload: number }>())
export const deleteMany = createAction('[team_STATE_SERVICE] Delete team', props<{ payload: number[] }>())
export const deleteByPredicate = createAction(
  '[team_STATE_SERVICE] Delete team By Predicate',
  props<{ payload: Predicate<Team> }>()
)
export const clear = createAction('[team_STATE_SERVICE] Clear team')

export type TeamActions = ReturnType<
  | typeof load
  | typeof setLoading
  | typeof setCurrent
  | typeof removeCurrent
  | typeof setMany
  | typeof addOne
  | typeof setOne
  | typeof upsertOne
  | typeof addMany
  | typeof upsertMany
  | typeof updateOne
  | typeof updateMany
  | typeof mapOne
  | typeof mapMany
  | typeof deleteOne
  | typeof deleteMany
  | typeof deleteByPredicate
  | typeof clear
>
