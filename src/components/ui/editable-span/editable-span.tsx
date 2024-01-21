import { memo } from 'react'

import { Button } from '@/components/ui/button'
import { EditableField } from '@/components/ui/editable-span/editable-field.tsx'
import s from '@/components/ui/editable-span/editable-span.module.scss'

type EditableSpanProps = {
  name: string
  email: string
  handleLogout: () => void
  onNameChange: (newName: string) => void
}

export const EditableSpan = memo(({ name, handleLogout, onNameChange }: EditableSpanProps) => {
  return (
    <>
      <EditableField initialValue={name} label="Nickname" onValueChange={onNameChange} />
      <div className={s.logoutButton}>
        <Button variant="secondary" onClick={handleLogout} fullWidth>
          Logout
        </Button>
      </div>
    </>
  )
})
