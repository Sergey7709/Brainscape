import { toast } from 'react-toastify'

import { useCreateDeckMutation } from '@/service'

export const useAddNewPack = () => {
  const [handlerAddNewPackSubmit, isLoading] = useCreateDeckMutation()

  const utilityAddNewPack = (formData: FormData) => {
    handlerAddNewPackSubmit(formData)
      .unwrap()
      .catch(error => {
        toast.error('Failed add new pack!:', error)
      })
  }

  return { utilityAddNewPack, isLoading }
}
