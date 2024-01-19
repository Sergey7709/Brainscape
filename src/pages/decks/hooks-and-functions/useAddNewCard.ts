import { toast } from 'react-toastify'

import { useCreateCardMutation } from '@/service'

export const useAddNewCard = () => {
  const [handlerAddNewCardSubmit, { isLoading }] = useCreateCardMutation()

  const utilityAddNewCard = (deckId: string, body: FormData) => {
    handlerAddNewCardSubmit({ deckId, body })
      .unwrap()
      .catch(error => {
        toast.error('Failed add new card!:', error)
      })
  }

  return { utilityAddNewCard, isLoading }
}
