export type GetDecksResponse = {
  items: DeckType[]
  pagination: Pagination
  maxCardsCount: number
}

export type DeckType = {
  author: Author
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string
  rating: number
  created: string
  updated: string
  cardsCount: number
}

export type Author = {
  id: string
  name: string
}

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}

export type CreateDeckRequest = {
  name: string
  cover: string
  isPrivate: boolean
}
