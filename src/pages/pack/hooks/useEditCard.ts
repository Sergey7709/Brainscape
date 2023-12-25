import { toast } from 'react-toastify'

import { useUpdateCardMutation } from '@/service'

export const useAddNewCard = () => {
  const [handlerEditCardSubmit, isLoading] = useUpdateCardMutation()

  const utilityEditCard = (id: string, body: FormData) => {
    handlerEditCardSubmit({ id, body })
      .unwrap()
      // .then(response => {
      //   if (response && response.id) {
      //     toast.success('A new package has been added!')
      //   }
      // })
      .catch(error => {
        toast.error('Failed edit card!:', error)
      })
  }

  return { utilityEditCard, isLoading }
}
