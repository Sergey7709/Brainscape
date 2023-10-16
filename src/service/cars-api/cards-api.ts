import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  CardType,
  CreateCardRequest,
  GetCardParams,
  GradeCardRequest,
} from '@/service/cars-api/types.ts'
import { GetEntitiesResponse } from '@/service/common/types.ts'

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  tagTypes: ['Cards'],
  endpoints: builder => {
    return {
      getCards: builder.query<GetEntitiesResponse<CardType>, GetCardParams>({
        query: ({ id, ...params }) => {
          return { url: `v1/decks/${id}/cards`, params }
        },
        providesTags: ['Cards'],
      }),
      createCard: builder.mutation<CardType, CreateCardRequest>({
        query: ({ deckId, ...body }) => ({
          url: `v1/decks/${deckId}/cards`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Cards'],
      }),
      getRandomCards: builder.query<CardType, string>({
        query: id => `v1/decks/${id}/cards`,
        providesTags: ['Cards'],
      }),
      gradeCard: builder.mutation<void, GradeCardRequest>({
        query: ({ id, ...body }) => ({
          url: `v1/decks/${id}/cards`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Cards'],
      }),
    }
  },
})

export const { useGetCardsQuery, useCreateCardMutation, useGetRandomCardsQuery } = cardsApi
