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
  // debugger
  const { data } = useGetAuthUserMeDataQuery()
  const [logOut] = useLogoutUserMutation()
  const [updateUserProfile] = useUpdateAuthUserDataMutation()

  const utilityFormData = async <T extends File | string>(key: string, dataForm: T) => {
    if (dataForm !== null) {
      const dataRequest = new FormData()

      dataRequest.append(key, dataForm)

      await updateUserProfile(dataRequest)
        .unwrap()
        .catch(error => toast.error(error.data.message)) ///!!!!
    }
  }

  // const handlerOnAvatarChange = (newAvatar: File) => {
  //   // console.log(newAvatar)
  //   utilityFormData('avatar', newAvatar)
  // }
  //
  // const handlerOnNameChange = (newName: string) => {
  //   // console.log(newName)
  //   utilityFormData('name', newName)
  // }
  //
  // const handlerOnEmailChange = (newEmail: string) => {
  //   // console.log(newEmail)
  //   utilityFormData('email', newEmail)
  // }

  const handlerOnAvatarChange = useCallback(
    (newAvatar: File) => {
      // console.log(newAvatar)
      utilityFormData('avatar', newAvatar)
    },
    [data]
  )
  const handlerOnNameChange = useCallback(
    (newName: string) => {
      // console.log(newName)
      utilityFormData('name', newName)
    },
    [data]
  )

  const handlerOnEmailChange = useCallback(
    (newEmail: string) => {
      // console.log(newEmail)
      utilityFormData('email', newEmail)
    },
    [data]
  )

  console.log('profile')

  return (
    <div className={s.profile}>
      {data && (
        <PersonalInformation
          name={data.name}
          email={data.email}
          avatar={data.avatar}
          onLogout={logOut}
          onAvatarChange={handlerOnAvatarChange}
          onNameChange={handlerOnNameChange}
          onEmailChange={handlerOnEmailChange} ///!!!!
        />
      )}
    </div>
  )
})
