import s from './decks-panel.module.scss'

import { Delete } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tab-switcher'
import { TextField } from '@/components/ui/textField'
import { useAppDispatch } from '@/service'
import { minMaxCardsCountReducer, initialState } from '@/service/store/deckParamsSlice.ts'

export const DecksPanel = () => {
  const dispatch = useAppDispatch()
  const {
    minMaxCardsCount: [minCardsCount, maxCardsCount],
  } = initialState ///!!!!!!!! Уточнить нормально ли так брать из слайса?

  const classNames = {
    decksPanel: s.decksPanel,
    searchInput: s.searchInput,
    slider: s.slider,
  }

  const handlerChangeValue = (value: number[]) => {
    console.log('value', value)
    dispatch(minMaxCardsCountReducer({ minMaxCardsCount: value }))
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
        min={minCardsCount}
        max={maxCardsCount}
        defaultValue={[minCardsCount, maxCardsCount]}
        onValueCommit={handlerChangeValue}
      />
      <Button variant={'secondary'}>
        <Delete /> Clear Filter
      </Button>
    </div>
  )
}
