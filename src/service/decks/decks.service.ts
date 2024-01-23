import { baseApi } from '@/service/common/base-api.ts'
import { GetEntitiesResponse } from '@/service/common/types.ts'
import { DeckType, PackCards, UpdateDeckRequest } from '@/service/decks/decks.types.ts'

export const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<GetEntitiesResponse<DeckType> & { maxCardsCount: number }, string>({
        query: arg => `v2/decks?${arg}`, //!!!!!!!
        providesTags: ['Deck'],
      }),
      createDeck: builder.mutation<DeckType, FormData>({
        query: body => ({
          url: `v1/decks/`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Deck'],
      }),
      getDeckById: builder.query<DeckType, string>({
        query: id => `v1/decks/${id}`,
        providesTags: ['Deck'],
      }),
      getDeckByIdCards: builder.query<
        GetEntitiesResponse<PackCards>,
        { id: string; query: string }
      >({
        query: arg => `v1/decks/${arg.id}/cards?${arg.query}`,
        providesTags: ['Deck'],
      }),
      updateDeck: builder.mutation<DeckType, UpdateDeckRequest>({
        query: ({ id, body }) => ({
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
  useUpdateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckByIdQuery,
  useGetDeckByIdCardsQuery,
} = decksService
