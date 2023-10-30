import { ChangeEvent, KeyboardEvent, memo, useState } from 'react'

import { EditModeProfile } from '@/components/ui/editable-span/edit-mode-profile.tsx'
import { ViewModeProfile } from '@/components/ui/editable-span/view-mode-profile.tsx'

export type EditableFieldProps = {
  initialValue: string
  label: 'Nickname' | 'Email'
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
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
      <EditModeProfile
        value={value}
        initialValue={initialValue}
        label={label}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
        handleSaveChanges={handleSaveChanges}
      />
    </>
  ) : (
    <>
      <ViewModeProfile
        label={label}
        handleSaveChanges={handleSaveChanges}
        initialValue={initialValue}
        activateEditMode={activateEditMode}
      />
    </>
  )
})
