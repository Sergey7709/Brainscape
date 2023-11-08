import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  authorCardsIDAbsent,
  currentPageValue,
  findNameValue,
  itemsPerPageValue,
  maxCardsValue,
  minCardsValue,
} from '@/service/store/constantsForInitialValue.ts'

type InitialState = {
  currentPage?: number
  itemsPerPage?: number
  minMaxCardsCount?: number[] //!!!!!!!!! доработать типизацию
  authorCards?: string
  findName?: string
}
export const initialState = {
  currentPage: currentPageValue,
  itemsPerPage: itemsPerPageValue,
  minMaxCardsCount: [minCardsValue, maxCardsValue],
  authorCards: authorCardsIDAbsent,
  findName: findNameValue,
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
    clearFilterReducer: () => initialState,
  },
})

export const {
  currentPageReducer,
  minMaxCardsCountReducer,
  myOrAllAuthorCardsReducer,
  clearFilterReducer,
  findNameReducer,
} = deckParamsSlice.actions
export default deckParamsSlice.reducer
