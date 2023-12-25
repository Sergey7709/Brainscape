import { toast } from 'react-toastify'

import { useCreateCardMutation } from '@/service'

export const useAddNewCard = () => {
  const [handlerAddNewCardSubmit, isLoading] = useCreateCardMutation()

  const utilityAddNewCard = (deckId: string, body: FormData) => {
    handlerAddNewCardSubmit({ deckId, body })
      .unwrap()
      // .then(response => {
      //   if (response && response.id) {
      //     toast.success('A new package has been added!')
      //   }
      // })
      .catch(error => {
        toast.error('Failed add new card!:', error)
      })
  }

  return { utilityAddNewCard, isLoading }
}
