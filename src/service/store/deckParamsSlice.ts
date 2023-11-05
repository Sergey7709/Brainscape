import { createSlice, PayloadAction } from '@reduxjs/toolkit'
type InitialState = {
  currentPage?: number
  itemsPerPage?: number
  minMaxCardsCount?: number[] //!!!!!!!!! доработать типизацию
}
export const initialState = {
  currentPage: 1,
  itemsPerPage: 10,
  minMaxCardsCount: [0, 50],
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
