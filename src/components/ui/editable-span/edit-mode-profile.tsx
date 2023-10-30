import { ChangeEvent, KeyboardEvent } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z, ZodObject } from 'zod'

import { Button } from '@/components/ui/button'
import { EditableFieldProps } from '@/components/ui/editable-span/editable-field.tsx'
import s from '@/components/ui/editable-span/editable-span.module.scss'
import { TextField } from '@/components/ui/textField'

type EditModeProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleKeyPress: (event: KeyboardEvent<HTMLSpanElement>) => void
  handleSaveChanges: () => void
  value: string
} & Omit<EditableFieldProps, 'onValueChange'>

type validation = {
  [key: string]: z.ZodString
}
type ValidationSchemas = {
  [label: string]: ZodObject<validation>
}

const validationSchemas: ValidationSchemas = {
  Email: z.object({
    Email: z.string().trim().email(),
  }),
  Nickname: z.object({
    Nickname: z.string().trim().min(3).max(30),
  }),
}

const getValidationSchema = (label: string) => {
  return validationSchemas[label] || z.object({})
}

export const EditModeProfile = ({
  label,
  initialValue,
  handleChange,
  handleSaveChanges,
  handleKeyPress,
  value,
}: EditModeProps) => {
  const validation = getValidationSchema(label)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { Nickname: initialValue, Email: initialValue },
    resolver: zodResolver(validation),
  })

  const textField = register(label)

  return (
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
  )
}
