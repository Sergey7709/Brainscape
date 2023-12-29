import { toast } from 'react-toastify'

import { useCreateDeckMutation } from '@/service'

export const useAddNewPack = () => {
  const [handlerAddNewPackSubmit, isLoading] = useCreateDeckMutation()

  const utilityAddNewPack = (formData: FormData) => {
    handlerAddNewPackSubmit(formData)
      .unwrap()
      // .then(response => {
      //   if (response && response.id) {
      //     toast.success('A new package has been added!')
      //   }
      // })
      .catch(error => {
        toast.error('Failed add new pack!:', error)
      })
  }

  return { utilityAddNewPack, isLoading }
}
