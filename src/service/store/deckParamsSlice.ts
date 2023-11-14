import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { currentPageValue } from '@/utils/constants/constantsForInitialValue.ts'

type InitialState = {
  currentPage?: number
}
export const initialState = {
  currentPage: currentPageValue,
}

const deckParamsSlice = createSlice({
  name: 'deckParams',
  initialState,
  reducers: {
    currentPageReducer: (state, action: PayloadAction<InitialState>) => {
      state.currentPage = action.payload.currentPage ?? currentPageValue
    },

    clearFilterReducer: () => initialState,
  },
})

export const { currentPageReducer, clearFilterReducer } = deckParamsSlice.actions
export default deckParamsSlice.reducer
