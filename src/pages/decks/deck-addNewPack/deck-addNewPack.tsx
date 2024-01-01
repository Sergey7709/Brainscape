import { useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './deck-addNewPack.module.scss'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { ModalAddOrEditPack } from '@/pages/decks/deck-modal-pack'
import { useAddNewPack } from '@/pages/decks/hooks-and-functions/useAddNewPack.ts'
import { utilityZodPackSchema } from '@/pages/decks/hooks-and-functions/utilityZodPackSchema.ts'

const { initialValues, addNewPackSchema } = utilityZodPackSchema()

type NewPackSchema = z.infer<typeof addNewPackSchema>

export const DeckAddNewPack = () => {
  const { utilityAddNewPack } = useAddNewPack()

  const [open, setOpen] = useState(false)

  const hiddenInputRefCover = useRef<HTMLInputElement | null>(null)

  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NewPackSchema>({
    resolver: zodResolver(addNewPackSchema),
    defaultValues: initialValues,
  })

  const {
    field: { value, onChange },
  } = useController({
    name: 'privatePack',
    control,
    defaultValue: false,
  })

  const {
    field: { value: nameFormValue, onChange: nameFormOnChange },
  } = useController({ name: 'namePack', control })

  const {
    field: { value: coverFormValue, onChange: coverFormOnChange },
  } = useController({ name: 'imageCover', control })

  const onHandleSubmitForm = handleSubmit((form: NewPackSchema) => {
    const formData = new FormData()

    if (form.imageCover?.[0] instanceof File) {
      formData.append('cover', form.imageCover[0])
    }
    formData.append('name', form.namePack)
    formData.append('isPrivate', JSON.stringify(form.privatePack))

    utilityAddNewPack(formData)

    setOpen(!open)
    reset()

    if (hiddenInputRefCover.current) {
      hiddenInputRefCover.current.value = ''
    }
  })

  const handlerClosedModal = () => {
    setOpen(!open)
  }

  const handlerFormCoverOnChange = (event: FileList | undefined | string) => {
    coverFormOnChange(event)
  }

  return (
    <ModalAddOrEditPack
      open={open}
      setOpen={setOpen}
      onHandleSubmitForm={onHandleSubmitForm}
      register={register}
      errors={errors}
      setValue={setValue}
      hiddenInputRefCover={hiddenInputRefCover}
      coverFormValue={coverFormValue}
      handlerFormCoverOnChange={handlerFormCoverOnChange}
      nameValue={nameFormValue}
      handlerNameChange={nameFormOnChange}
      value={value}
      onChange={onChange}
      handlerClosedModal={handlerClosedModal}
      headerTitle={'Add new pack'}
      buttonTitle={'Add new pack'}
    >
      <Button as={'button'} variant={'primary'} className={s.buttonAddNewPack}>
        <Typography className={s.textButtonAddNewPack}>Add new pack</Typography>
      </Button>
    </ModalAddOrEditPack>
  )
}
