import { toast } from 'react-toastify'

import { useDeleteDeckMutation } from '@/service'

export const useDeletePack = (name: string) => {
  const [deletePack, isLoading] = useDeleteDeckMutation()

  const utilityDeletePack = (id: string) => {
    deletePack(id)
      .unwrap()
      // .then(response => {
      //   if (response && response.id) {
      //     toast.success(`The pack ${name} has been successfully deleted!`)
      //   }
      // })
      .catch(error => {
        toast.error(`Failed to delete: ${name} `, error)
      })
  }

  return { utilityDeletePack, isLoading }
}
