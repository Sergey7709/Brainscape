import {
  CardType,
  CardTypeFormData,
  CreateCardRequest,
  GetCardParams,
  GetRandomCards,
  GradeCardRequest,
} from '@/service/cards/cards.types.ts'
import { baseApi } from '@/service/common/base-api.ts'
import { GetEntitiesResponse } from '@/service/common/types.ts'

export const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<GetEntitiesResponse<CardType>, GetCardParams>({
        query: ({ id, ...params }) => {
          return { url: `v1/decks/${id}/cards`, params }
        },
        providesTags: ['Cards'],
      }),
      createCard: builder.mutation<CardType, CreateCardRequest>({
        query: ({ deckId, body }) => ({
          url: `v1/decks/${deckId}/cards`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Deck'],
      }),
      getRandomCards: builder.query<CardType, GetRandomCards>({
        query: ({ id, previousCardId }) =>
          `v1/decks/${id}/learn?previousCardId=${previousCardId ?? ''}`,
        providesTags: ['Cards'],
      }),
      gradeCard: builder.mutation<void, GradeCardRequest>({
        query: ({ id, body }) => ({
          url: `v1/decks/${id}/learn`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Cards'],
      }),
      getCardById: builder.query<CardType, string>({
        query: id => `v1/cards/${id}`,
        providesTags: ['Cards'],
      }),
      updateCard: builder.mutation<Partial<CardType>, CardTypeFormData>({
        query: ({ id, body }) => ({
          url: `v1/cards/${id}`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: ['Deck'],
      }),
      deleteCard: builder.mutation<void, string>({
        query: id => ({
          url: `v1/cards/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Deck'],
      }),
    }
  },
})

export const {
  useGetCardsQuery,
  useCreateCardMutation,
  useGetRandomCardsQuery,
  useDeleteCardMutation,
  useGradeCardMutation,
  useGetCardByIdQuery,
  useUpdateCardMutation,
} = cardsService
