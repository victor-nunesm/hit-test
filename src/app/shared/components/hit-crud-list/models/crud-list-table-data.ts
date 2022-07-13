export interface CrudListPaginatedData<T> {
  response: any
  entities: T[]
}

export type CrudListTableData<T> = T[] | CrudListPaginatedData<T>
