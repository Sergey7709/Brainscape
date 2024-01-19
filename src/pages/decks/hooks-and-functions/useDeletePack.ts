import { toast } from 'react-toastify'

import { useNavigateBackToDeck } from '@/pages/decks/hooks-and-functions/useNavigateBackToDeck.ts'
import { useDeleteDeckMutation } from '@/service'

export const useDeletePack = (name: string) => {
  const [deletePack, { isLoading }] = useDeleteDeckMutation()

  const { navigateBackToDeck } = useNavigateBackToDeck()

  const utilityDeletePack = (id: string) => {
    deletePack(id)
      .unwrap()
      .then(response => {
        if (response && response.id) {
          navigateBackToDeck()
        }
      })
      .catch(error => {
        toast.error(`Failed to delete: ${name} `, error)
      })
  }

  return { utilityDeletePack, isLoading }
}
