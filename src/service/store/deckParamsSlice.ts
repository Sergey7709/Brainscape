import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  currentPageValue,
  itemsPerPageValue,
  maxCardsValue,
  minCardsValue,
} from '@/service/store/constantsForInitialValue.ts'

type InitialState = {
  currentPage?: number
  itemsPerPage?: number
  minMaxCardsCount?: number[] //!!!!!!!!! доработать типизацию
}
export const initialState = {
  currentPage: currentPageValue,
  itemsPerPage: itemsPerPageValue,
  minMaxCardsCount: [minCardsValue, maxCardsValue],
}

const deckParamsSlice = createSlice({
  name: 'deckParams',
  initialState,
  reducers: {
    currentPageReducer: (state, action: PayloadAction<InitialState>) => {
      state.currentPage = action.payload.currentPage ?? 1
    },
    minMaxCardsCountReducer: (state, action: PayloadAction<InitialState>) => {
      state.minMaxCardsCount = action.payload.minMaxCardsCount ?? [0, 50]
    },
  },
})

export const { currentPageReducer, minMaxCardsCountReducer } = deckParamsSlice.actions
export default deckParamsSlice.reducer
