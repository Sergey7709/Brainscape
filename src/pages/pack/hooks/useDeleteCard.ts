import { toast } from 'react-toastify'

import { useDeleteCardMutation } from '@/service'

export const useDeleteCard = () => {
  const [deleteCard, isLoading] = useDeleteCardMutation()

  const utilityDeleteCard = (id: string) => {
    deleteCard(id)
      .unwrap()
      .then(() => {
        // toast.success(`The card  has been successfully deleted!`)
      })
      .catch(error => {
        toast.error(`Failed to delete card`, error)
      })
  }

  return { utilityDeleteCard, isLoading }
}
