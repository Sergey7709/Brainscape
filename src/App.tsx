import { Router } from '@/router.tsx'
import { useGetDecksQuery } from '@/service/decks/decks.service.ts'

export function App() {
  const result = useGetDecksQuery()

  console.log(result)

  return (
    // <div
    //   style={{
    //     padding: 10,
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     flexDirection: 'column',
    //     gap: '1rem',
    //   }}
    // >
    //   <Button as={'button'} variant={'primary'}>
    //     button primary
    //   </Button>
    //   Hello
    //   <Button as={'a'} variant={'primary'} href={'/link'}>
    //     link
    //   </Button>
    //   <Modal active>
    //     <ModalConstructor.PortalAndOverlay>
    //       <ModalConstructor.Head justifyContentHeader={'left'} borderBottomHeader>
    //         <Typography as={'span'} variant={'large'}>
    //           Add New Card
    //         </Typography>
    //       </ModalConstructor.Head>
    //       <ModalConstructor.Body>
    //         <TextField label={'Choose a question format'}></TextField>
    //         <TextField label={'Question'}></TextField>
    //         <TextField label={'Answer'}></TextField>
    //       </ModalConstructor.Body>
    //       <ModalConstructor.Footer>
    //         <Button variant={'secondary'}>
    //           <Typography as={'span'} variant={'body2'}>
    //             Cancel
    //           </Typography>
    //         </Button>
    //         <div style={{ width: '146px' }}>
    //           <Button variant={'primary'} fullWidth>
    //             <Typography as={'span'} variant={'body2'}>
    //               Add New Card
    //             </Typography>
    //           </Button>
    //         </div>
    //       </ModalConstructor.Footer>
    //     </ModalConstructor.PortalAndOverlay>
    //     <ModalConstructor.Trigger>
    //       <Button as={'button'} variant={'tertiary'}>
    //         Open the modal
    //       </Button>
    //     </ModalConstructor.Trigger>
    //   </Modal>
    // </div>
    // eslint-disable-next-line react/jsx-no-undef

    <Router />
  )
}
