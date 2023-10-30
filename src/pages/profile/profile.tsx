import { memo, useCallback } from 'react'

import { NavLink } from 'react-router-dom'

import s from './profile.module.scss'

import { PersonalInformation } from '@/components/profile/personal-information'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { useUtilityFormData } from '@/pages/profile/useUtilityFormData.ts'
import { useGetAuthUserMeDataQuery, useLogoutUserMutation } from '@/service'

export const Profile = memo(() => {
  const { data } = useGetAuthUserMeDataQuery()
  const [logOut] = useLogoutUserMutation()

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
