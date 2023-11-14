import { Dispatch, memo, SetStateAction, useCallback, useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './decks-panel.module.scss'

import { Delete } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tab-switcher'
import { Sort } from '@/components/ui/tables'
import { TextField } from '@/components/ui/textField'
import { milliSecondsValue, useAppDispatch } from '@/service'
import { clearFilterReducer } from '@/service/store/deckParamsSlice.ts'
import { utilityForSearchParamsEdit } from '@/utils'
import { maxCardsValue, minCardsValue } from '@/utils/constants/constantsForInitialValue.ts'
import { useDebounce } from '@/utils/functions/useDebounce.ts'

type DecksPanelProps = {
  handlerTabSwitchChangeValue: (value: string) => void
  setSort?: Dispatch<SetStateAction<Sort>>
}
export const DecksPanel = memo(({ handlerTabSwitchChangeValue, setSort }: DecksPanelProps) => {
  const dispatch = useAppDispatch() ////!!!!!!!!!!!!! удалить

  const [searchParams, setSearchParams] = useSearchParams()
  const nameValueTextField = searchParams.get('name') || ''
  const minCardsCount = Number(searchParams.get('minCardsCount')) || minCardsValue
  const maxCardsCount = Number(searchParams.get('maxCardsCount')) || maxCardsValue
  const myOrAllAuthorCards = searchParams.get('authorId') || 'allCards'

  const [valueForSlider, setValueForSlider] = useState<number[]>([minCardsCount, maxCardsCount])

  const [searchValue, setSearchValue] = useState<string>(nameValueTextField ?? '')
  const debounce = useDebounce({ value: searchValue, milliSeconds: milliSecondsValue })

  useEffect(() => {
    utilityForSearchParamsEdit({
      searchParams,
      setSearchParams,
      param: 'name',
      valueForNewParam: debounce,
    })
  }, [debounce])

  const classNames = {
    decksPanel: s.decksPanel,
    searchInput: s.searchInput,
    slider: s.slider,
  }

  const handlerSliderCommitValue = (value: number[]) => {
    utilityForSearchParamsEdit({
      searchParams,
      setSearchParams,
      param: 'minCardsCount',
      param2: 'maxCardsCount',
      valueForNewParam: value[0].toString(),
      valueForNewParam2: value[1].toString(),
    })
  }
  const handlerValueChangeSlider = (value: number[]) => {
    setValueForSlider(value)
  }

  const handlerTextFieldChangeValue = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  const handlerClearFilter = () => {
    dispatch(clearFilterReducer()) ////!!!!!!!!!!!!! удалить
    setValueForSlider([minCardsValue, maxCardsValue])
    setSearchValue('')
    setSort?.(null)
    setSearchParams('')
  }

  return (
    <>
      <div className={classNames.decksPanel}>
        <div className={classNames.searchInput}>
          <TextField
            type={'search'}
            placeholder={'Input search'}
            onValueChange={handlerTextFieldChangeValue}
            value={searchValue}
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
          onValueCommit={handlerSliderCommitValue}
          value={valueForSlider}
          onValueChange={handlerValueChangeSlider}
        />
        <Button variant={'secondary'} onClick={handlerClearFilter}>
          <Delete /> Clear Filter
        </Button>
      </div>
    </>
  )
})
