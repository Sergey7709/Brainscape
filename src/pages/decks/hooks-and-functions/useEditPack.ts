import { toast } from 'react-toastify'

import { useUpdateDeckMutation } from '@/service'

export const useEditPack = () => {
  const [handlerEditPackSubmit, { isLoading }] = useUpdateDeckMutation()

  const utilityEditPack = (id: string, body: FormData) => {
    handlerEditPackSubmit({ id, body })
      .unwrap()
      .catch(error => {
        toast.error('Failed edit pack!:', error)
      })
  }

  return { utilityEditPack, isLoading }
}
