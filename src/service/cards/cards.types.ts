export type CardType = {
  id: string
  body: FormData
}
export type GetCardParams = {
  id: string
  question: string
  answer: string
  orderBy: string
  currentPage: number
  itemsPerPage: number
}

export type CreateCardRequest = {
  deckId: string
  body: FormData
}

export type GradeCardRequest = {
  id: string
  body: { cardId: string; grade: 1 | 2 | 3 | 4 | 5 }
}
