import { ChangeEvent, KeyboardEvent, memo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Redactor } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import s from '@/components/ui/editable-span/editable-span.module.scss'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

type EditableFieldProps = {
  initialValue: string
  label: 'Nickname' | 'Email'
  onValueChange: (newValue: string) => void
}

const getValidationSchema = (label: string) => {
  switch (label) {
    case 'Email':
      return z.object({
        Email: z.string().trim().email(),
      })
    case 'Nickname':
      return z.object({
        Nickname: z.string().trim().min(3).max(30),
      })
    default:
      return z.object({})
  }
}

export const EditableField = memo(({ initialValue, label, onValueChange }: EditableFieldProps) => {
  const [editMode, setEditMode] = useState(false)
  const [value, setValue] = useState(initialValue)

  const validationSchema = getValidationSchema(label)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { Nickname: initialValue, Email: initialValue },
    resolver: zodResolver(validationSchema),
  })

  const textField = register(label)

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
        type="text"
        value={value}
        {...textField}
        onChange={e => {
          textField.onChange(e)
          handleChange(e)
        }}
        errorMessage={errors.Email?.message || errors.Nickname?.message}
        onBlur={handleSubmit(handleSaveChanges)}
        onKeyDown={handleKeyPress}
        label={label}
      />
      <Button
        variant="primary"
        fullWidth={true}
        className={s.buttonSave}
        onClick={handleSubmit(handleSaveChanges)}
      >
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
