import s from './decks-panel.module.scss'

import { Delete } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tab-switcher'
import { TextField } from '@/components/ui/textField'
import { useAppDispatch } from '@/service'
import { maxCardsValue, minCardsValue } from '@/service/store/constantsForInitialValue.ts'
import { minMaxCardsCountReducer } from '@/service/store/deckParamsSlice.ts'

type DecksPanelProps = {
  handlerTabSwitchChangeValue: (value: string) => void
}
export const DecksPanel = ({ handlerTabSwitchChangeValue }: DecksPanelProps) => {
  const dispatch = useAppDispatch()

  const classNames = {
    decksPanel: s.decksPanel,
    searchInput: s.searchInput,
    slider: s.slider,
  }

  const handlerSliderChangeValue = (value: number[]) => {
    console.log('valueSlider', value)
    dispatch(minMaxCardsCountReducer({ minMaxCardsCount: value }))
  }

  // const handlerTabSwitchChangeValue = (value: string) => {
  //   console.log('valueTabSwitch', value)
  // }

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
        onValueChange={handlerTabSwitchChangeValue}
      />
      <Slider
        className={classNames.slider}
        label={'Number of cards'}
        min={minCardsValue}
        max={maxCardsValue}
        defaultValue={[minCardsValue, maxCardsValue]}
        onValueCommit={handlerSliderChangeValue}
      />
      <Button variant={'secondary'}>
        <Delete /> Clear Filter
      </Button>
    </div>
  )
}
