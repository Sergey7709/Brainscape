import { memo, useCallback } from 'react'

import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './profile.module.scss'

import { PersonalInformation } from '@/components/profile/personal-information'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { useUtilityFormData } from '@/pages/profile/useUtilityFormData.ts'
import {
  useGetAuthUserMeDataQuery,
  useLogoutUserMutation,
  useUpdateAuthUserDataMutation,
} from '@/service'

export const Profile = memo(() => {
  const { data } = useGetAuthUserMeDataQuery()
  const [logOut] = useLogoutUserMutation()
  // const [updateUserProfile, isLoading] = useUpdateAuthUserDataMutation()
  //
  // const utilityFormData = async <T extends File | string>(key: string, dataForm: T) => {
  //   if (dataForm !== null) {
  //     const dataRequest = new FormData()
  //
  //     dataRequest.append(key, dataForm)
  //
  //     await updateUserProfile(dataRequest)
  //       .unwrap()
  //       .catch(error => {
  //         if (error.status === 400) {
  //           toast.error(error.data.errorMessages[0].message)
  //         } else if (error.status === 500) {
  //           toast.error(error.data.message)
  //         }
  //       })
  //   }
  // }

  const { utilityFormData, isLoading } = useUtilityFormData()

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

  const handlerOnEmailChange = useCallback(
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
          onEmailChange={handlerOnEmailChange}
        />
      )}
      <div className={s.button}>
        <Button variant={'tertiary'} as={NavLink} to={'/'} className={s.btn} fullWidth>
          Back to main page
        </Button>
      </div>
    </div>
  )
})
