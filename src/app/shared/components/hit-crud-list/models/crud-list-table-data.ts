export interface CrudListPaginatedData<T> {
  response: any
  entities: T[]
}

export type CrudListTeam<T> = T[] | CrudListPaginatedData<T>
