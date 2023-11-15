import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sort } from '@/components/ui/tables'
import {
  currentPageValue,
  findNameValue,
  maxCardsValue,
  minCardsValue,
} from '@/utils/constants/constantsForInitialValue.ts'

type InitialState = {
  currentPage?: number
  findName?: string
  minMaxCardsCount?: number[]
  sortTable?: Sort
}
export const initialState = {
  currentPage: currentPageValue,
  findName: findNameValue,
  minMaxCardsCount: [minCardsValue, maxCardsValue],
  sortTable: null as Sort, ///!!!!
}

const deckParamsSlice = createSlice({
  name: 'deckParams',
  initialState,
  reducers: {
    currentPageReducer: (state, action: PayloadAction<InitialState>) => {
      state.currentPage = action.payload.currentPage ?? currentPageValue
    },
    findNameReducer: (state, action: PayloadAction<InitialState>) => {
      state.findName = action.payload.findName ?? ''
    },
    minMaxCardsCountReducer: (state, action: PayloadAction<InitialState>) => {
      state.minMaxCardsCount = action.payload.minMaxCardsCount ?? [minCardsValue, maxCardsValue]
    },
    sortTableReducer: (state, action: PayloadAction<InitialState>) => {
      state.sortTable = action.payload.sortTable ?? null
    },
    clearFilterReducer: () => initialState,
  },
})

export const {
  currentPageReducer,
  findNameReducer,
  clearFilterReducer,
  minMaxCardsCountReducer,
  sortTableReducer,
} = deckParamsSlice.actions
export default deckParamsSlice.reducer
