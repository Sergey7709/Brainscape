import { memo, useCallback } from 'react'

import { useNavigate } from 'react-router-dom'

import s from './profile.module.scss'

import { PersonalInformation } from '@/components/profile/personal-information'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/ui/loader'
import { useUtilityFormData } from '@/pages/profile/useUtilityFormData.ts'
import { useGetAuthUserMeDataQuery, useLogoutUserMutation } from '@/service'
import { nameParams } from '@/shared/constants/constantsForSearchParams.ts'

export const Profile = memo(() => {
  const { data } = useGetAuthUserMeDataQuery()
  const [logOut] = useLogoutUserMutation()

  const navigate = useNavigate()

  const { utilityFormData, isLoading } = useUtilityFormData()

  const handlerOnAvatarChange = useCallback(
    (newAvatar: File) => {
      utilityFormData('avatar', newAvatar)
    },
    [data]
  )
  const handlerOnNameChange = useCallback(
    (newName: string) => {
      utilityFormData(nameParams, newName)
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
        />
      )}
      <div className={s.button}>
        <Button variant={'tertiary'} as={'button'} onClick={() => navigate(-1)} fullWidth>
          Back to previous page
        </Button>
      </div>
    </div>
  )
})
