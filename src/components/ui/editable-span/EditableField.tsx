import { ChangeEvent, KeyboardEvent, memo, useState } from 'react'

import { Redactor } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import s from '@/components/ui/editable-span/editable-span.module.scss'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

type EditableFieldProps = {
  initialValue: string
  label: string
  onValueChange: (newValue: string) => void
}

export const EditableField = memo(({ initialValue, label, onValueChange }: EditableFieldProps) => {
  const [editMode, setEditMode] = useState(false)
  const [value, setValue] = useState(initialValue)

  const activateEditMode = () => {
    setEditMode(true)
    setValue(initialValue)
  }

  const activateViewMode = () => {
    setEditMode(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur()
    }
  }

  const handleSaveChanges = () => {
    activateViewMode()
    onValueChange(value)
  }

  return editMode ? (
    <>
      <TextField
        className={s.nameInput}
        type="text"
        value={value}
        onChange={handleChange}
        onBlur={handleSaveChanges}
        onKeyDown={handleKeyPress}
        label={label}
      />
      <Button variant="primary" fullWidth={true} onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </>
  ) : (
    <div className={s.nameContainer}>
      <Typography
        variant="h1"
        className={label === 'Nickname' ? s.name : s.email}
        onDoubleClick={handleSaveChanges}
      >
        {initialValue}
      </Typography>
      <Button variant="link" className={s.editNameButton} onClick={activateEditMode}>
        <Redactor />
      </Button>
    </div>
  )
})
