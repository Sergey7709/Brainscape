export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}

export type GetEntitiesResponse<T> = {
  items: T[]
  pagination: Pagination
}
