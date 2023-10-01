import { Button } from '@/components/ui/button'
import { Modal, ModalConstructor } from '@/components/ui/modal'

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
      <Modal className={''} active>
        <ModalConstructor.PortalAndOverlay>
          <ModalConstructor.Head>Sign in</ModalConstructor.Head>
          <ModalConstructor.Body>
            <div className={'123'}></div>
            <input placeholder="Username" />
            <input placeholder="Password" type="password" />
            <button>Sign in</button>
          </ModalConstructor.Body>
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
