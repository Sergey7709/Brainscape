import { useState } from 'react'

import s from './decks-panel.module.scss'

import { Delete } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tab-switcher'
import { TextField } from '@/components/ui/textField'
import { useCombineAppSelector } from '@/pages/decks/useCombineAppSelector.ts'
import { useAppDispatch } from '@/service'
import { maxCardsValue, minCardsValue } from '@/service/store/constantsForInitialValue.ts'
import { clearFilterReducer, minMaxCardsCountReducer } from '@/service/store/deckParamsSlice.ts'

type DecksPanelProps = {
  handlerTabSwitchChangeValue: (value: string) => void
}
export const DecksPanel = ({ handlerTabSwitchChangeValue }: DecksPanelProps) => {
  const dispatch = useAppDispatch()

  const {
    minMaxCardsCount: [minCardsCount, maxCardsCount],
    myOrAllAuthorCards,
  } = useCombineAppSelector()

  const [valueForSlider, setValueForSlider] = useState<number[]>(
    [minCardsCount, maxCardsCount] || [minCardsValue, maxCardsValue]
  )

  const classNames = {
    decksPanel: s.decksPanel,
    searchInput: s.searchInput,
    slider: s.slider,
  }

  const handlerSliderChangeValue = (value: number[]) => {
    console.log('valueSlider', value)
    dispatch(minMaxCardsCountReducer({ minMaxCardsCount: value }))
  }

  const handlerTextFieldChangeValue = (value: string) => {
    console.log('TextFieldValue', value)
  }

  const handlerClearFilter = () => {
    dispatch(clearFilterReducer())
    setValueForSlider([minCardsValue, maxCardsValue])
  }

  const handleOnValueChange = (value: number[]) => {
    setValueForSlider(value)
  }

  console.log('deck-panel')
  console.log('min', minCardsCount, 'max', maxCardsCount)

  return (
    <div className={classNames.decksPanel}>
      <div className={classNames.searchInput}>
        <TextField
          type={'search'}
          placeholder={'Input search'}
          onValueChange={handlerTextFieldChangeValue}
        />
      </div>
      <TabSwitcher
        label={'Show packs cards'}
        value={myOrAllAuthorCards === 'allCards' ? 'allCards' : 'myCards'}
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
        defaultValue={[minCardsCount, maxCardsCount]}
        // defaultValue={[minCardsValue, maxCardsValue]}
        onValueCommit={handlerSliderChangeValue}
        // value={[minMaxCardsCount[0], minMaxCardsCount[1]]}
        value={valueForSlider}
        onValueChange={handleOnValueChange}
      />
      <Button variant={'secondary'} onClick={handlerClearFilter}>
        <Delete /> Clear Filter
      </Button>
    </div>
  )
}
