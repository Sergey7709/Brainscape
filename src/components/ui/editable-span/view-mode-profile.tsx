import clsx from 'clsx'

import { Redactor } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { EditableFieldProps } from '@/components/ui/editable-span/editable-field.tsx'
import s from '@/components/ui/editable-span/editable-span.module.scss'
import { Typography } from '@/components/ui/typography'

type ViewModeProfileProps = {
  activateEditMode: () => void
  handleSaveChanges: () => void
} & Omit<EditableFieldProps, 'onValueChange'>
export const ViewModeProfile = ({
  label,
  initialValue,
  activateEditMode,
  handleSaveChanges,
}: ViewModeProfileProps) => {
  const labelClassName = clsx({
    [s.name]: label === 'Nickname',
    [s.email]: label === 'Email',
  })

  return (
    <div className={s.nameContainer}>
      <Typography variant="h1" className={labelClassName} onDoubleClick={handleSaveChanges}>
        {initialValue}
      </Typography>
      <Button variant="link" className={s.editNameButton} onClick={activateEditMode}>
        <Redactor />
      </Button>
    </div>
  )
}
