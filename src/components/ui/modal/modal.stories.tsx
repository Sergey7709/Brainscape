import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal/modal.tsx'
import { ModalConstructor } from '@/components/ui/modal/modalConstructor.tsx'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: { type: '-' },
      description: 'Required! This property, when true, opens a modal window.',
    },
    setOpen: {
      control: { type: '-' },
      description: 'Required! Function that sets the value of the open property to true or false',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    showCloseButton: {
      control: { type: 'boolean' },
      description:
        'This property adds a close button in the right corner of the modal window when set to true',
    },
    borderBottomHeader: {
      control: { type: 'boolean' },
      description:
        'Adds a bottom border for the Header component.\n' +
        '\n' +
        'This property is only specified in the <b> ModalConstructor.Head </b> child component!',
    },
    justifyContentHeader: {
      options: ['left', 'center', 'right'],
      control: { type: 'radio' },
      description:
        'Adds text positioning options for the Header component.\n' +
        '\n' +
        'This property is only specified in the <b>ModalConstructor.Head</b> child component!',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Is a controlled component\n' +
          '\n' +
          'The Modal component includes child components using children props:\n' +
          '\n' +
          '<ModalConstructor.PortalAndOverlay> * Required for displays modal overlay and container\n' +
          '\n' +
          '<ModalConstructor.Head> * Optional to display text or header\n' +
          '\n' +
          '<ModalConstructor.Body> * Optional for any content\n' +
          '\n' +
          '<ModalConstructor.Footer> * Optional for bottom content with buttons\n' +
          '\n' +
          '<ModalConstructor.Trigger> * Optional for modal window call button\n',
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#313131',
        },
      ],
    },
  },
} satisfies Meta<typeof Modal>

export default meta

type Story = StoryObj<typeof meta>

export const Modals: Story = {
  args: {
    size: 'md',
    showCloseButton: true,
    borderBottomHeader: false,
    justifyContentHeader: 'left',
    open: false,
  },
  render: args => {
    const [open, setOpen] = useState(false)

    const handlerClosedModal = () => {
      setOpen(!open)
    }

    return (
      <Modal
        open={open}
        setOpen={setOpen}
        size={args.size}
        justifyContentHeader={args.justifyContentHeader}
        showCloseButton={args.showCloseButton}
      >
        <ModalConstructor.PortalAndOverlay>
          <ModalConstructor.Head
            borderBottomHeader={args.borderBottomHeader}
            justifyContentHeader={args.justifyContentHeader}
          >
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
            <Button variant={'secondary'} onClick={handlerClosedModal}>
              <Typography as={'span'} variant={'body2'}>
                Cancel
              </Typography>
            </Button>
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
    )
  },
}
