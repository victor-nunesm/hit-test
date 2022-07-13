import { Injectable } from '@angular/core'
import { TableData } from '@core/models'
import { Dictionary } from '@ngrx/entity'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as actions from './table.actions'
import * as selectors from './table.selectors'
import { TableState } from './table.state'

@Injectable({ providedIn: 'root' })
export class TableStateService {
  SELECTORS = selectors
  ACTIONS = actions
  constructor(private _store: Store<TableState>) {}

  get store() {
    return this._store
  }

  // Selectors
  getState(): Observable<TableState> {
    return this.store.select(selectors.selectState)
  }

  getAll(): Observable<TableData[]> {
    return this.store.select(selectors.selectAll)
  }

  getCurrent(): Observable<TableData> {
    return this.store.select(selectors.selectCurrent)
  }

  getEntities(): Observable<Dictionary<TableData>> {
    return this.store.select(selectors.selectEntities)
  }

  getLoadingState(): Observable<boolean> {
    return this.store.select(selectors.getLoadingState)
  }

  // Actions
  add(entity: TableData) {
    this.store.dispatch(actions.addOne({ payload: entity }))
  }

  delete(entity: TableData) {
    this.store.dispatch(actions.deleteOne({ payload: entity.time.time_id }))
  }

  removeCurrent() {
    this.store.dispatch(actions.removeCurrent())
  }

  setCurrent(entity: TableData) {
    return this.store.dispatch(actions.setCurrent({ payload: entity }))
  }

  update(entity: TableData) {
    return this.store.dispatch(actions.updateOne({ payload: { id: entity.time.time_id, changes: entity } }))
  }

  upsertOne(entity: TableData) {
    return this.store.dispatch(actions.upsertOne({ payload: entity }))
  }

  load(entities: TableData[]) {
    return this.store.dispatch(actions.load({ payload: entities }))
  }

  upsertMany(entities: TableData[]) {
    return this.store.dispatch(actions.upsertMany({ payload: entities }))
  }

  setLoading(loading: boolean) {
    return this.store.dispatch(actions.setLoading({ payload: loading }))
  }
}
