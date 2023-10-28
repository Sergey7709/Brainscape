import { memo } from 'react'

import { Button } from '@/components/ui/button'
import s from '@/components/ui/editable-span/editable-span.module.scss'
import { EditableField } from '@/components/ui/editable-span/EditableField.tsx'

type EditableSpanProps = {
  name: string
  email: string
  handleLogout: () => void
  onNameChange: (newName: string) => void
  onEmailChange: (newEmail: string) => void
}

export const EditableSpan = memo(
  ({ name, email, handleLogout, onNameChange, onEmailChange }: EditableSpanProps) => {
    console.log('span')

    return (
      <>
        <EditableField initialValue={name} label="Nickname" onValueChange={onNameChange} />
        <EditableField initialValue={email} label="Email" onValueChange={onEmailChange} />
        <div className={s.logoutButton}>
          <Button variant="secondary" onClick={handleLogout} fullWidth>
            Logout
          </Button>
        </div>
      </>
    )
  }
)
