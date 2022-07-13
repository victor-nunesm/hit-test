import { TableData } from '@core/models'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import moment from 'moment'

export interface TableState extends EntityState<TableData> {
  loading: boolean
  error: any
  current: TableData | null
}

export const adapter: EntityAdapter<TableData> = createEntityAdapter<TableData>({
  // sortComparer: sortByCreatedAt,
  selectId: (data: TableData) => data.time.time_id,
})

export const initialState: TableState = adapter.getInitialState({
  loading: false,
  error: null,
  current: null,
})

function sortByCreatedAt(a: any, b: any): number {
  let aCreatedAt = a.createdAt as Date
  let bCreatedAt = b.createdAt as Date
  if (moment(aCreatedAt).isBefore(bCreatedAt)) return 1
  else if (moment(aCreatedAt).isAfter(bCreatedAt)) return -1
  return 0
}
