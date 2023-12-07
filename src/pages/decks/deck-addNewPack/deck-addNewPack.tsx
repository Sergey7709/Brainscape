import { useState } from 'react'

import s from './deck-addNewPack.module.scss'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/check-box'
import { ImageUploader } from '@/components/ui/imageUploader'
import { Modal, ModalConstructor } from '@/components/ui/modal'
import { ModalProps } from '@/components/ui/modal/typeForModal.ts'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

export const DeckAddNewPack = (props: ModalProps) => {
  const [cover, setCover] = useState<string>('')

  const handlerAddCoverPack = (image: File) => {
    setCover(URL.createObjectURL(image))
  }

  return (
    <Modal {...props}>
      <ModalConstructor.PortalAndOverlay>
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
            <div className={s.imgCoverWrapper}>
              {cover && <img className={s.imageCover} src={cover} alt="preview" />}
            </div>
            <div className={s.buttonCoverWrapper}>
              <ImageUploader
                onAddImage={handlerAddCoverPack}
                classNameButton={s.modalAddButtonCover}
                classNameInput={s.modalAddInputCover}
              />
            </div>
          </div>
          <TextField label={'Name Pack'}></TextField>
          <Checkbox label={'Private Pack'} checked={false} />
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
      </ModalConstructor.PortalAndOverlay>
      <ModalConstructor.Trigger>
        <Button as={'button'} variant={'primary'}>
          Add new pack
        </Button>
      </ModalConstructor.Trigger>
    </Modal>
  )
}
