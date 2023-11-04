import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentPage: 1,
  itemsPerPage: 10,
}

type InitialState = {
  currentPage?: number
  itemsPerPage?: number
}

const deckParamsSlice = createSlice({
  name: 'deckParams',
  initialState,
  reducers: {
    currentPageReducer: (state, action: PayloadAction<InitialState>) => {
      state.currentPage = action.payload.currentPage ?? 1
    },
  },
})

export const { currentPageReducer } = deckParamsSlice.actions
export default deckParamsSlice.reducer
