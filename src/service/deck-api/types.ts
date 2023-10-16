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

export type CreateDeckRequest = {
  name: string
  cover?: string
  isPrivate?: boolean
}

export type UpdateDeckRequest = CreateDeckRequest & { id: string }
