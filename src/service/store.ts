import { configureStore } from '@reduxjs/toolkit'

import { cardsApi } from '@/service/cars-api/cards-api.ts'
import { decksApi } from '@/service/deck-api/decks-api.ts'

export const store = configureStore({
  reducer: {
    [decksApi.reducerPath]: decksApi.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(decksApi.middleware).concat(cardsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
