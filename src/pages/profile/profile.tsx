import { memo, useCallback } from 'react'

import { toast } from 'react-toastify'

import s from './profile.module.scss'

import { PersonalInformation } from '@/components/profile/personal-information'
import { Loader } from '@/components/ui/loader'
import {
  useGetAuthUserMeDataQuery,
  useLogoutUserMutation,
  useUpdateAuthUserDataMutation,
} from '@/service'

export const Profile = memo(() => {
  const { data } = useGetAuthUserMeDataQuery()
  const [logOut] = useLogoutUserMutation()
  const [updateUserProfile, isLoading] = useUpdateAuthUserDataMutation()

  const utilityFormData = async <T extends File | string>(key: string, dataForm: T) => {
    if (dataForm !== null) {
      const dataRequest = new FormData()

      dataRequest.append(key, dataForm)

      await updateUserProfile(dataRequest)
        .unwrap()
        .catch(error => {
          if (error.status === 400) {
            toast.error(error.data.errorMessages[0].message)
          } else if (error.status === 500) {
            toast.error(error.data.message)
          }
        })
    }
  }

  const handlerOnAvatarChange = useCallback(
    (newAvatar: File) => {
      utilityFormData('avatar', newAvatar)
    },
    [data]
  )
  const handlerOnNameChange = useCallback(
    (newName: string) => {
      utilityFormData('name', newName)
    },
    [data]
  )

  const handlerOnEmailChanges = useCallback(
    (newEmail: string) => {
      utilityFormData('email', newEmail)
    },
    [data]
  )

  return (
    <div className={s.profile}>
      {isLoading.isLoading && <Loader />}
      {data && (
        <PersonalInformation
          name={data.name}
          email={data.email}
          avatar={data.avatar}
          onLogout={logOut}
          onAvatarChange={handlerOnAvatarChange}
          onNameChange={handlerOnNameChange}
          onEmailChange={handlerOnEmailChanges}
        />
      )}
    </div>
  )
})
