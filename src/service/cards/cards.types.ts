// export type CardType<T extends 'req' | 'res' = 'res'> = T extends 'req'
//   ? {
//       id: string
//       body: FormData
//     }
//   : CardProps

export type CardTypeFormData = {
  id: string
  body: FormData
}

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
  body: FormData
}

export type GradeCardRequest = {
  id: string
  body: { cardId: string; grade: 1 | 2 | 3 | 4 | 5 }
}
