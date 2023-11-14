import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DeckType } from '@/service/decks/decks.types.ts'
import {
  authorCardsIDAbsent,
  currentPageValue,
  findNameValue,
  itemsPerPageValue,
  maxCardsValue,
  minCardsValue,
  orderByValue,
  searchParamsQueryValue,
} from '@/service/store/constantsForInitialValue.ts'

type InitialState = {
  currentPage?: number
  itemsPerPage?: number
  minMaxCardsCount?: number[] //!!!!!!!!! доработать типизацию
  authorCards?: string
  findName?: string
  orderBy?: string //!!!!!!!!! доработать типизацию
  searchParamsQuery?: string ///!!!!!!!
  sortedData?: DeckType[]
}
export const initialState = {
  currentPage: currentPageValue,
  itemsPerPage: itemsPerPageValue,
  minMaxCardsCount: [minCardsValue, maxCardsValue],
  authorCards: authorCardsIDAbsent,
  findName: findNameValue,
  orderBy: orderByValue,
  searchParamsQuery: searchParamsQueryValue, ///!!!!!!!
  sortedData: [] as DeckType[],
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
    // searchParamsQuery: (state, action: PayloadAction<InitialState>) => {
    //   state.searchParamsQuery = action.payload.searchParamsQuery ?? searchParamsQueryValue
    // }, //!!!!!!!!
    sortedDataReducer: (state, action: PayloadAction<InitialState>) => {
      state.sortedData = action.payload.sortedData ?? []
    }, //!!!!!!!!
    clearFilterReducer: () => initialState,
  },
})

export const {
  currentPageReducer,
  minMaxCardsCountReducer,
  myOrAllAuthorCardsReducer,
  clearFilterReducer,
  sortedDataReducer,
  findNameReducer,
  orderByReducer,
  // searchParamsQuery, ///!!!!!
} = deckParamsSlice.actions
export default deckParamsSlice.reducer
