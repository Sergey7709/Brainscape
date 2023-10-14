import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { CreateDeckRequest, DeckType, GetDecksResponse } from '@/service/types.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
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
          url: `v1/decks`,
          method: 'POST',
          body,
        }),
      }),
    }
  },
})

export const { useGetDecksQuery, useCreateDeckMutation } = baseApi
