import { toast } from 'react-toastify'

import { useUpdateCardMutation } from '@/service'

export const useEditCard = () => {
  const [handlerEditCardSubmit, { isLoading }] = useUpdateCardMutation()

  const utilityEditCard = (id: string, body: FormData) => {
    handlerEditCardSubmit({ id, body })
      .unwrap()
      .catch(error => {
        toast.error('Failed edit card!:', error)
      })
  }

  return { utilityEditCard, isLoading }
}
