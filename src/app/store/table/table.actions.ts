import { TableData } from '@core/models'
import { EntityMap, EntityMapOne, Predicate, Update } from '@ngrx/entity'
import { createAction, props } from '@ngrx/store'

export const load = createAction('[TABLE_STATE_SERVICE] Load Table', props<{ payload: TableData[] }>())
export const setLoading = createAction('[TABLE_STATE_SERVICE] Set Table Loading', props<{ payload: boolean }>())
export const setCurrent = createAction('[TABLE_STATE_SERVICE] Set Current Table', props<{ payload: TableData }>())
export const removeCurrent = createAction('[TABLE_STATE_SERVICE] Remove Current Table')
export const setMany = createAction('[TABLE_STATE_SERVICE] Set Table', props<{ payload: TableData[] }>())
export const addOne = createAction('[TABLE_STATE_SERVICE] Add Table', props<{ payload: TableData }>())
export const setOne = createAction('[TABLE_STATE_SERVICE] Set Table', props<{ payload: TableData }>())
export const upsertOne = createAction('[TABLE_STATE_SERVICE] Upsert Table', props<{ payload: TableData }>())
export const addMany = createAction('[TABLE_STATE_SERVICE] Add Table', props<{ payload: TableData[] }>())
export const upsertMany = createAction('[TABLE_STATE_SERVICE] UpsertMany Table', props<{ payload: TableData[] }>())
export const updateOne = createAction('[TABLE_STATE_SERVICE] Update Table', props<{ payload: Update<TableData> }>())
export const updateMany = createAction('[TABLE_STATE_SERVICE] Update Table', props<{ payload: Update<TableData>[] }>())
export const mapOne = createAction('[TABLE_STATE_SERVICE] Map Table', props<{ payload: EntityMapOne<TableData> }>())
export const mapMany = createAction('[TABLE_STATE_SERVICE] Map Table', props<{ payload: EntityMap<TableData> }>())
export const deleteOne = createAction('[TABLE_STATE_SERVICE] Delete Table', props<{ payload: number }>())
export const deleteMany = createAction('[TABLE_STATE_SERVICE] Delete Table', props<{ payload: number[] }>())
export const deleteByPredicate = createAction(
  '[TABLE_STATE_SERVICE] Delete Table By Predicate',
  props<{ payload: Predicate<TableData> }>()
)
export const clear = createAction('[TABLE_STATE_SERVICE] Clear Table')

export type TableActions = ReturnType<
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
