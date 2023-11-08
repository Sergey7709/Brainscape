import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  authorCardsIDAbsent,
  currentPageValue,
  findNameValue,
  itemsPerPageValue,
  maxCardsValue,
  minCardsValue,
  orderByValue,
} from '@/service/store/constantsForInitialValue.ts'

type InitialState = {
  currentPage?: number
  itemsPerPage?: number
  minMaxCardsCount?: number[] //!!!!!!!!! доработать типизацию
  authorCards?: string
  findName?: string
  orderBy?: string //!!!!!!!!! доработать типизацию
}
export const initialState = {
  currentPage: currentPageValue,
  itemsPerPage: itemsPerPageValue,
  minMaxCardsCount: [minCardsValue, maxCardsValue],
  authorCards: authorCardsIDAbsent,
  findName: findNameValue,
  orderBy: orderByValue,
}

const deckParamsSlice = createSlice({
  name: 'deckParams',
  initialState,
  reducers: {
    currentPageReducer: (state, action: PayloadAction<InitialState>) => {
      state.currentPage = action.payload.currentPage ?? currentPageValue
    },
    minMaxCardsCountReducer: (state, action: PayloadAction<InitialState>) => {
      state.minMaxCardsCount = action.payload.minMaxCardsCount ?? [minCardsValue, maxCardsValue]
    },
    myOrAllAuthorCardsReducer: (state, action: PayloadAction<InitialState>) => {
      state.authorCards = action.payload.authorCards ?? authorCardsIDAbsent
    },
    findNameReducer: (state, action: PayloadAction<InitialState>) => {
      state.findName = action.payload.findName ?? findNameValue
    },
    orderByReducer: (state, action: PayloadAction<InitialState>) => {
      state.orderBy = action.payload.orderBy ?? orderByValue
    },
    clearFilterReducer: () => initialState,
  },
})

export const {
  currentPageReducer,
  minMaxCardsCountReducer,
  myOrAllAuthorCardsReducer,
  clearFilterReducer,
  findNameReducer,
  orderByReducer,
} = deckParamsSlice.actions
export default deckParamsSlice.reducer
