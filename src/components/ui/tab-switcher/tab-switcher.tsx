import { FC, ReactNode } from 'react'

import * as RadixLabel from '@radix-ui/react-label'
import * as Tabs from '@radix-ui/react-tabs'
import { TabsContent, TabsListProps, TabsProps, TabsTrigger } from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './tab-switcher.module.scss'

import { Typography } from '@/components/ui/typography'

/**
 * A component for switching between tabs.
 * @param {CombinedTabsProps} props - The properties for the tab switcher
 * @returns {ReactNode} The rendered tab switcher.
 */

export type TabsAsChildProps = { asChild?: boolean }

export type TabDataProps = {
  value: string
  title: string
  disabled?: boolean
  content?: ReactNode | ReactNode[]
}

export type TabsTriggerProps = { fullWidth?: boolean }

export type TabsContentProps = { forceMount?: boolean }

export type CombinedTabsProps = TabsAsChildProps &
  TabsListProps &
  TabsTriggerProps &
  TabsContentProps &
  TabsProps & { children?: ReactNode; label?: string; tabData: TabDataProps[] }

export const TabSwitcher: FC<CombinedTabsProps> = props => {
  const {
    value,
    children,
    defaultValue,
    onValueChange,
    fullWidth = false,
    tabData,
    orientation = 'horizontal',
    dir = 'ltr',
    activationMode = 'automatic',
    loop = true,
    label,
    className,
    ...restProps
  } = props

  const renderTabsForTrigger = tabData?.map((el, index) => (
    <TabsTrigger
      key={el.value}
      className={clsx(
        s.tabsTrigger,
        el.disabled && s.disabled,
        fullWidth && s.fullWidth,
        index > 0 && s.nextTab,
        index === 0 && s.firstTab
      )}
      value={el.disabled ? 'disabled' : el.value}
      disabled={!!el.disabled}
    >
      {el.title}
    </TabsTrigger>
  ))

  const renderChildrenOrTabContent =
    children ||
    tabData?.map(el => (
      <TabsContent key={el.value} value={el.disabled ? '' : el.value}>
        {el.content}
      </TabsContent>
    ))

  return (
    // <RadixLabel.Root>
    //   {label && (
    //     <Typography variant={'body1'} as={'label'} className={s.label}>
    //       {label}
    //     </Typography>
    //   )}
    <Tabs.Root
      className={clsx(s.tabsRoot, className)}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      orientation={orientation}
      activationMode={activationMode}
      dir={dir}
      asChild={restProps.asChild}
    >
      <RadixLabel.Root>
        {label && (
          <Typography variant={'body1'} as={'label'} className={s.label}>
            {label}
          </Typography>
        )}
      </RadixLabel.Root>
      <div>
        <Tabs.List className={s.tabsList} loop={loop}>
          {renderTabsForTrigger}
        </Tabs.List>
        {renderChildrenOrTabContent}
      </div>
    </Tabs.Root>
    // </RadixLabel.Root>
  )
}
