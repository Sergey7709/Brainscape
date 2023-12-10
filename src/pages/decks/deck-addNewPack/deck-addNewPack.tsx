import { ChangeEvent, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './deck-addNewPack.module.scss'

import { ChangePhoto } from '@/assets/icons'
import { SignInForm, signInSchema } from '@/components/auth/sign-in'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/check-box'
import { ImageUploader } from '@/components/ui/imageUploader'
import { Modal, ModalConstructor } from '@/components/ui/modal'
import { ModalProps } from '@/components/ui/modal/typeForModal.ts'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import { useCreateDeckMutation } from '@/service'

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
  imageCover: z.instanceof(FileList).optional(),
})

export type NewPackSchema = z.infer<typeof addNewPackSchema>

const initialValues: NewPackSchema = {
  imageCover: undefined,
  namePack: '',
  privatePack: false,
}

export const DeckAddNewPack = (props: ModalProps) => {
  const [handlerAddNewPackSubmit] = useCreateDeckMutation()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewPackSchema>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
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
    // onHandleSubmit(form)
    console.log('form', form)
  })

  return (
    <Modal>
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
            <div className={s.cover}>
              <div className={s.buttonCoverWrapper}>
                <ImageUploader
                  classNameButton={s.modalAddButtonCover}
                  classNameInput={s.modalAddInputCover}
                  classNameImg={s.imageCover}
                  register={register}
                  errorMessage={errors.imageCover?.message}
                />
              </div>
            </div>
            <TextField
              label={'Name Pack'}
              {...register('namePack')}
              errorMessage={errors.namePack?.message}
            ></TextField>
            <Checkbox label={'Private Pack'} checked={value} onChange={onChange} />
          </ModalConstructor.Body>
          <ModalConstructor.Footer>
            <Button variant={'secondary'}>
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
