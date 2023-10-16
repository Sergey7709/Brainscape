import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { GetEntitiesResponse } from '@/service/common/types.ts'
import { CreateDeckRequest, DeckType, UpdateDeckRequest } from '@/service/deck-api/types.ts'

export const decksApi = createApi({
  reducerPath: 'decksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  tagTypes: ['Deck'],
  endpoints: builder => {
    return {
      getDecks: builder.query<GetEntitiesResponse<DeckType> & { maxCardsCount: number }, void>({
        query: () => `v1/decks`,
        providesTags: ['Deck'],
      }),
      createDeck: builder.mutation<DeckType, CreateDeckRequest>({
        query: body => ({
          url: `v1/decks/`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Deck'],
      }),
      retrieveDeckById: builder.query<DeckType, string>({
        query: id => `v1/decks/${id}`,
      }),
      updateDeck: builder.mutation<DeckType, UpdateDeckRequest>({
        query: ({ id, ...body }) => ({
          url: `v1/decks/${id}`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: ['Deck'],
      }),
      deleteDeck: builder.mutation<Omit<DeckType, 'author'>, string>({
        query: id => ({
          url: `v1/decks/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Deck'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDeckMutation,
  useRetrieveDeckByIdQuery,
  useUpdateDeckMutation,
  useDeleteDeckMutation,
} = decksApi
