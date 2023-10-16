import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  CreateDeckRequest,
  DeckType,
  GetDecksResponse,
  UpdateDeckRequest,
} from '@/service/deck-api/types.ts'

export const decksApi = createApi({
  reducerPath: 'decksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      getDecks: builder.query<GetDecksResponse, void>({
        query: () => `v1/decks`,
      }),
      createDeck: builder.mutation<DeckType, CreateDeckRequest>({
        query: body => ({
          url: `v1/decks/`,
          method: 'POST',
          body,
        }),
      }),
      retrieveDeck: builder.query<DeckType, string>({
        query: id => `v1/decks/${id}`,
      }),
      updateDeck: builder.mutation<DeckType, UpdateDeckRequest>({
        query: ({ id, ...body }) => ({
          url: `v1/decks/${id}`,
          method: 'PATCH',
          body,
        }),
      }),
      deleteDeck: builder.mutation<Omit<DeckType, 'author'>, string>({
        query: id => ({
          url: `v1/decks/${id}`,
          method: 'DELETE',
        }),
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useRetrieveDeckQuery,
  useUpdateDeckMutation,
  useDeleteDeckMutation,
} = decksApi
