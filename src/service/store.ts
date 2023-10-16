import { configureStore } from '@reduxjs/toolkit'

import { decksApi } from '@/service/deck-api/decks-api.ts'

export const store = configureStore({
  reducer: {
    [decksApi.reducerPath]: decksApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(decksApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
