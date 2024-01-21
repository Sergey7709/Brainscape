import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sort } from '@/components/ui/tables'
import {
  currentPageValue,
  findNameValue,
  maxCardsValue,
  minCardsValue,
  packFindNameValue,
  selectItemsPerPageValue,
} from '@/utils/constants/constantsForInitialValue.ts'

type InitialState = {
  currentPage?: number
  findName?: string
  minMaxCardsCount?: number[]
  sortTable?: Sort
  packFindName?: string
  selectItemsPerPage?: string
}
export const initialState = {
  currentPage: currentPageValue,
  findName: findNameValue,
  minMaxCardsCount: [minCardsValue, maxCardsValue],
  sortTable: null as Sort,
  packFindName: packFindNameValue,
  selectItemsPerPage: selectItemsPerPageValue,
}

const deckParamsSlice = createSlice({
  name: 'deckParams',
  initialState,
  reducers: {
    findNameReducer: (state, action: PayloadAction<InitialState>) => {
      state.findName = action.payload.findName ?? findNameValue
    },
    minMaxCardsCountReducer: (state, action: PayloadAction<InitialState>) => {
      state.minMaxCardsCount = action.payload.minMaxCardsCount ?? [minCardsValue, maxCardsValue]
    },
    packFindNameReducer: (state, action: PayloadAction<InitialState>) => {
      state.packFindName = action.payload.packFindName ?? packFindNameValue
    },
    selectItemsPerPageReducer: (state, action: PayloadAction<InitialState>) => {
      state.selectItemsPerPage = action.payload.selectItemsPerPage ?? selectItemsPerPageValue
    },
    clearFilterReducer: state => {
      return {
        ...initialState,
        minMaxCardsCount: [initialState.minMaxCardsCount[0], state.minMaxCardsCount[1]],
      }
    },
  },
})

export const {
  findNameReducer,
  clearFilterReducer,
  minMaxCardsCountReducer,
  packFindNameReducer,
  selectItemsPerPageReducer,
} = deckParamsSlice.actions
export default deckParamsSlice.reducer
