import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/check-box'
import { ImageUploader } from '@/components/ui/imageUploader'
import { Modal, ModalConstructor } from '@/components/ui/modal'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { FILE_SIZE_LIMIT } from '@/pages/decks/constantsDeck.ts'
import { useAddNewPack } from '@/pages/decks/hooks-and-functions/useAddNewPack.ts'
import { DeckAddNewPackProp } from '@/service/decks/decks.types.ts'

const fileSchema = z
  .any()
  .refine(fileList => fileList[0]?.size <= FILE_SIZE_LIMIT, `Max file size is 1MB.`)

export const addNewPackSchema = z.object({
  namePack: z
    .string({
      required_error: 'Name is required',
    })
    .trim()
    .nonempty('Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(30),

  privatePack: z.boolean().optional(),
  imageCover: fileSchema.optional(),
})

type NewPackSchema = z.infer<typeof addNewPackSchema>

const initialValues: NewPackSchema = {
  imageCover: undefined,
  namePack: '',
  privatePack: false,
}

export const DeckAddNewPack = (props: DeckAddNewPackProp) => {
  const { utilityAddNewPack } = useAddNewPack()

  const [open, setOpen] = useState(false)
  const [nameValue, setNameValue] = useState('')
  const [cover, setCover] = useState<string>('')

  const {
    control,
    handleSubmit,
    register,
    setValue,
    reset,
    clearErrors,
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

  const onHandleSubmitForm = handleSubmit((form: NewPackSchema) => {
    const formData = new FormData()

    if (form.imageCover?.[0] instanceof File) {
      formData.append('cover', form.imageCover[0])
    }
    formData.append('name', form.namePack)
    formData.append('isPrivate', JSON.stringify(form.privatePack))

    utilityAddNewPack(formData)

    setOpen(!open)
    setNameValue('')
    setCover('')
    reset()
  })

  const handlerClosedModal = () => {
    setOpen(!open)
  }

  const handlerNameChange = (value: string) => {
    setNameValue(value)
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <ModalConstructor.PortalAndOverlay>
        <form onSubmit={onHandleSubmitForm}>
          <ModalConstructor.Head
            borderBottomHeader={props.borderBottomHeader}
            justifyContentHeader={props.justifyContentHeader}
          >
            <Typography as={'span'} variant={'large'}>
              Add new pack
            </Typography>
          </ModalConstructor.Head>
          <ModalConstructor.Body>
            <ImageUploader
              register={register}
              setValue={setValue}
              cover={cover}
              setCover={setCover}
              errorMessage={errors.imageCover?.message?.toString()}
              clearErrors={clearErrors}
            />
            <TextField
              value={nameValue}
              onValueChange={handlerNameChange}
              label={'Name Pack'}
              {...register('namePack')}
              errorMessage={errors.namePack?.message}
            ></TextField>
            <Checkbox label={'Private Pack'} checked={value} onChange={onChange} />
          </ModalConstructor.Body>
          <ModalConstructor.Footer>
            <Button type={'button'} variant={'secondary'} onClick={handlerClosedModal}>
              <Typography as={'span'} variant={'body2'}>
                Cancel
              </Typography>
            </Button>
            <Button variant={'primary'} fullWidth>
              <Typography as={'span'} variant={'body2'}>
                Add new pack
              </Typography>
            </Button>
          </ModalConstructor.Footer>
        </form>
      </ModalConstructor.PortalAndOverlay>
      <ModalConstructor.Trigger>
        <Button as={'button'} variant={'primary'}>
          Add new pack
        </Button>
      </ModalConstructor.Trigger>
    </Modal>
  )
}
