import { ModalProps } from '@/components/ui/modal/typeForModal.ts'

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

export type UpdateDeckRequest = { id: string; body: FormData }

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

export type DeckAddNewPackProp = Omit<ModalProps, 'open' | 'setOpen'>
