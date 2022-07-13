export interface BasePagination {
  pageIndex: number
  pageSize: number
  sortField?: string | null
  sortOrder?: string | null
  filters?: Array<{ key: string; value: string[] }>
  search?: string
}
