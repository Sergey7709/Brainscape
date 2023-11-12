import { memo, useCallback, useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './decks-panel.module.scss'

import { Delete } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tab-switcher'
import { Sort } from '@/components/ui/tables'
import { TextField } from '@/components/ui/textField'
import { useCombineAppSelector } from '@/pages/decks/useCombineAppSelector.ts'
import { useAppDispatch, useAppSelector } from '@/service'
import { maxCardsValue, minCardsValue } from '@/service/store/constantsForInitialValue.ts'
import {
  clearFilterReducer,
  currentPageReducer,
  findNameReducer,
  minMaxCardsCountReducer,
  searchParamsQuery,
} from '@/service/store/deckParamsSlice.ts'
import { useIsFirstRender } from '@/utils'
import { useDebounce } from '@/utils/functions/useDebounce.ts'

type DecksPanelProps = {
  handlerTabSwitchChangeValue: (value: string) => void
  setSort?: React.Dispatch<React.SetStateAction<Sort>>
}
export const DecksPanel = memo(({ handlerTabSwitchChangeValue, setSort }: DecksPanelProps) => {
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams() ///!!!!

  const {
    minMaxCardsCount: [minCardsCount, maxCardsCount],
    myOrAllAuthorCards,
    findName,
  } = useCombineAppSelector()

  const [valueForSlider, setValueForSlider] = useState<number[]>(
    [minCardsCount, maxCardsCount] || [minCardsValue, maxCardsValue]
  )

  const [searchValue, setSearchValue] = useState<string>(searchParams.get('name') ?? '') ///!!! проверить надо ли добавить для инициации из слайса findName
  const debounce = useDebounce({ value: searchValue, milliSeconds: 1000 })

  const isFirstRender = useIsFirstRender() ///!!!!

  useEffect(() => {
    if (isFirstRender) {
      // setSearchValue(searchParams.get('name') ?? '') ///!!!!! что бы восстановить значение searchValue при перерендеренге после get запроса
      // setSearchValue(findName) ///!!!!! что бы восстановить значение searchValue при перерендеренге после get запроса

      return
    }
    console.log('name', searchParams.get('name'))
    // console.log('TextFieldValue', debounce)
    dispatch(findNameReducer({ findName: debounce }))
    dispatch(currentPageReducer({ currentPage: 1 }))
  }, [debounce]) ///!!!!

  const classNames = {
    decksPanel: s.decksPanel,
    searchInput: s.searchInput,
    slider: s.slider,
  }

  const handlerSliderCommitValue = (value: number[]) => {
    dispatch(minMaxCardsCountReducer({ minMaxCardsCount: value }))
    dispatch(currentPageReducer({ currentPage: 1 }))
  }

  const handlerTextFieldChangeValue = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  const handlerClearFilter = () => {
    dispatch(clearFilterReducer())
    setValueForSlider([minCardsValue, maxCardsValue])
    setSearchValue('')
    setSort?.(null)
    setSearchParams('') ////!!!!!!!!!!!!! обнуляю SearchParams
    dispatch(searchParamsQuery({ searchParamsQuery: '' })) ///!!!!!!
  }

  const handlerValueChangeSlider = (value: number[]) => {
    setValueForSlider(value)
  }

  // console.log('deck-panel')
  // console.log('min', minCardsCount, 'max', maxCardsCount)

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
