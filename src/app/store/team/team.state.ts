import { Team } from '@core/models'
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import moment from 'moment'

export interface TeamState extends EntityState<Team> {
  loading: boolean
  error: any
  current: Team | null
}

export const adapter: EntityAdapter<Team> = createEntityAdapter<Team>({
  // sortComparer: sortByCreatedAt,
  selectId: (data: Team) => data.time.time_id,
})

export const initialState: TeamState = adapter.getInitialState({
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
