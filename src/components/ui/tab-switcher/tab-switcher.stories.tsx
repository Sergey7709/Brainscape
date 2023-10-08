import { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from '@/components/ui/tab-switcher/tab-switcher.tsx'

const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      control: { type: 'boolean' },
      description: ' If true, the component will render as a child of the parent',
    },
    orientation: {
      options: ['vertical', 'horizontal'],
      control: { type: 'select' },
      description: 'The orientation of the component.',
    },
    dir: {
      options: ['ltr', 'rtl'],
      control: { type: 'select' },
      description:
        'The reading direction of the tabs. If omitted, inherits globally from DirectionProvider or assumes LTR (left-to-right) reading mode.',
    },
    activationMode: {
      options: ['automatic', 'manual'],
      control: { type: 'select' },
    },
    defaultValue: {
      control: { type: 'text' },
      description:
        'The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs.',
    },
    value: {
      control: { type: 'text' },
      description:
        'The controlled value of the tab to activate. Should be used in conjunction with onValueChange.',
    },
    onValueChange: {
      action: 'onValueChange',
      description: 'Event handler called when the value changes.',
    },
    loop: {
      control: { type: 'boolean' },
      description:
        'When true, keyboard navigation will loop from last tab to first, and vice versa. *This props is used for List. ',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'When true, tabs will take up the full width of their container.',
    },
    forceMount: {
      control: { type: 'boolean' },
      description:
        'When true, the component will mount in the DOM. Used to force mounting when more control is needed. Useful when controlling animation with React animation libraries.',
    },
    tabData: {
      description:
        "This is an array consisting of objects. (Example of a nested object with the type of one tab's requisite)" +
        '\n' +
        '\n { value: string\n' +
        '\n title: string\n' +
        '\n disabled?: boolean\n' +
        '\n content?: ReactNode | ReactNode[]\n}',
    },
  },
  parameters: {
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
} satisfies Meta<typeof TabSwitcher>

export default meta

type Story = StoryObj<typeof meta>

export const TabSwitch: Story = {
  args: {
    tabData: [
      {
        value: 'tab1',
        title: 'tab1',
        disabled: false,
        content: 'tab1 content',
      },
      {
        value: 'tab2',
        title: 'tab2',
        disabled: true,
        content: 'tab2 content',
      },
      {
        value: 'tab3',
        title: 'tab3',
        disabled: false,
        content: 'tab3 content',
      },
      {
        value: 'tab4',
        title: 'tab4',
        disabled: false,
        content: 'tab4 content',
      },
      {
        value: 'tab5',
        title: 'tab5',
        disabled: false,
        content: 'tab5 content',
      },
    ],
    defaultValue: 'tab1',
    onValueChange: (value: string) => {
      console.log(value)
    },
    orientation: 'horizontal',
    dir: 'ltr',
    activationMode: 'automatic',
    loop: true,
    asChild: false,
    fullWidth: false,
    forceMount: false,
  },

  render: args => <TabSwitcher {...args} />,
}
