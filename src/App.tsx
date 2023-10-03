import { TextField } from './components/ui/textField'

import { Button } from '@/components/ui/button'
import { Modal, ModalConstructor } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'

export function App() {
  return (
    <div
      style={{
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Button as={'button'} variant={'primary'}>
        button primary
      </Button>
      Hello
      <Button as={'a'} variant={'primary'} href={'/link'}>
        link
      </Button>
      <Modal showCloseButton={false} active>
        <ModalConstructor.PortalAndOverlay>
          <ModalConstructor.Head>
            <Typography as={'span'} variant={'large'}>
              Add New Card
            </Typography>
          </ModalConstructor.Head>
          <ModalConstructor.Body>
            <TextField label={'Choose a question format'}></TextField>
            <TextField label={'Question'}></TextField>
            <TextField label={'Answer'}></TextField>
          </ModalConstructor.Body>
          <ModalConstructor.Footer>
            <div style={{ width: '100px' }}>
              <Button variant={'secondary'}>
                <Typography as={'span'} variant={'body2'}>
                  Cancel
                </Typography>
              </Button>
            </div>
            <Button variant={'primary'} fullWidth>
              <Typography as={'span'} variant={'body2'}>
                Add New Card
              </Typography>
            </Button>
          </ModalConstructor.Footer>
        </ModalConstructor.PortalAndOverlay>
        <ModalConstructor.Trigger>
          <Button as={'button'} variant={'tertiary'}>
            Open the modal
          </Button>
        </ModalConstructor.Trigger>
      </Modal>
    </div>
  )
}
