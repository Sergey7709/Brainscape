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
  updated: Date
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

export type GetDeckParams = {
  minCardsCount?: string
  maxCardsCount?: string
  name?: string
  authorId?: string
  orderBy?: 'asc' | 'desc'
  currentPage?: number
  itemsPerPage?: number
}

export type PackCards = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  created: string
  updated: string
  grade: number
} ///!!!!!!!!!
