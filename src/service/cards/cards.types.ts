export type CardType = {
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
  rating: number
  created: string
  updated: string
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
  question: string
  answer: string
  questionImg: string
  answerImg: string
  questionVideo: string
  answerVideo: string
}

// export type GradeCardRequest = {
//   id: string
//   rating: 1 | 2 | 3 | 4 | 5
// }
export type GradeCardRequest = {
  id: string
  body: { cardId: string; grade: number }
}
