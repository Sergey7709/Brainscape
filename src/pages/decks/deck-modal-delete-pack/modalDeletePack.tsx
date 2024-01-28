import s from './modalDeletePack.module.scss'

import { Button } from '@/components/ui/button'
import { Modal, ModalConstructor } from '@/components/ui/modal'
import { ModalProps } from '@/components/ui/modal/typeForModal.ts'
import { Typography } from '@/components/ui/typography'

type ModalDeletePackProps = {
  handlerClosedModal: () => void
  handlerDeletePack: () => void
  name: string
} & ModalProps
export const ModalDeletePack = (props: ModalDeletePackProps) => {
  const { open, setOpen, name, handlerDeletePack, handlerClosedModal } = props

  return (
    <Modal open={open} setOpen={setOpen}>
      <ModalConstructor.PortalAndOverlay>
        <ModalConstructor.Head borderBottomHeader justifyContentHeader={'left'}>
          <Typography as={'span'} variant={'h2'}>
            Delete Pack
          </Typography>
        </ModalConstructor.Head>
        <ModalConstructor.Body>
          <Typography variant={'body1'}>
            {`Do you really want to remove pack '${name}'? All cards will be deleted.`}
          </Typography>
        </ModalConstructor.Body>
        <ModalConstructor.Footer>
          <Button type={'button'} variant={'secondary'} onClick={handlerClosedModal}>
            <Typography as={'span'} variant={'body2'}>
              Cancel
            </Typography>
          </Button>
          <Button variant={'primary'} className={s.buttonDelete} onClick={handlerDeletePack}>
            <Typography as={'span'} variant={'body2'}>
              Delete Pack
            </Typography>
          </Button>
        </ModalConstructor.Footer>
      </ModalConstructor.PortalAndOverlay>
    </Modal>
  )
}
