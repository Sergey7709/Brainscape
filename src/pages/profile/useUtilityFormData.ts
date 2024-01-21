import { toast } from 'react-toastify'

import { useUpdateAuthUserDataMutation } from '@/service'

export const useUtilityFormData = () => {
  const [updateUserProfile, isLoading] = useUpdateAuthUserDataMutation()

  const utilityFormData = async <T extends File | string>(key: string, dataForm: T) => {
    if (dataForm !== null) {
      const dataRequest = new FormData()

      dataRequest.append(key, dataForm)

      await updateUserProfile(dataRequest)
        .unwrap()
        .catch(error => {
          if (error.status === 400) {
            toast.error('User not found')
          } else if (error.status === 401) {
            toast.error('Not logged in')
          } else if (error.status === 500) {
            toast.error(error.data.message)
          }
        })
    }
  }

  return { utilityFormData, isLoading }
}
