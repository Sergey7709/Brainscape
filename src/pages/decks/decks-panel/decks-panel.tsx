import s from './decks-panel.module.scss'

import { Delete } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tab-switcher'
import { TextField } from '@/components/ui/textField'

export const DecksPanel = () => {
  const classNames = {
    decksPanel: s.decksPanel,
    searchInput: s.searchInput,
    slider: s.slider,
  }

  return (
    <div className={classNames.decksPanel}>
      <div className={classNames.searchInput}>
        <TextField type={'search'} placeholder={'Input search'} />
      </div>
      <TabSwitcher
        label={'Show packs cards'}
        defaultValue={'allCards'}
        tabData={[
          {
            title: 'My cards',
            value: 'myCards',
          },
          {
            title: 'All cards',
            value: 'allCards',
          },
        ]}
      />
      <Slider
        className={classNames.slider}
        label={'Number of cards'}
        min={0}
        max={10}
        defaultValue={[0, 10]}
      />
      <Button variant={'secondary'}>
        <Delete /> Clear Filter
      </Button>
    </div>
  )
}
