import { memo, useCallback, useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './decks-panel.module.scss'

import { Delete } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tab-switcher'
import { TextField } from '@/components/ui/textField'
import { milliSecondsValue, useAppDispatch, useGetAuthUserMeDataQuery } from '@/service'
import {
  clearFilterReducer,
  findNameReducer,
  minMaxCardsCountReducer,
} from '@/service/store/deckParamsSlice.ts'
import { useCombineAppSelector, useIsFirstRender, useUtilityForSearchParamsEdit } from '@/utils'
import { maxCardsValue, minCardsValue } from '@/utils/constants/constantsForInitialValue.ts'
import { useDebounce } from '@/utils/functions/useDebounce.ts'

export const DecksPanel = memo(() => {
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()

  const { searchValue, valueForSlider } = useCombineAppSelector()

  const isFirstRender = useIsFirstRender()

  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()

  const { data: meData } = useGetAuthUserMeDataQuery()

  const meID = meData?.id ?? ''

  const myOrAllAuthorCards = searchParams.get('authorId') || 'allCards'
  const findText = searchParams.get('name') ?? ''

  const minMaxCardsUrlValue = [
    Number(searchParams.get('minCardsCount') || valueForSlider[0]),
    Number(searchParams.get('maxCardsCount') || valueForSlider[1]),
  ]

  const actualValueSlider = isFirstRender
    ? dispatch(minMaxCardsCountReducer({ minMaxCardsCount: minMaxCardsUrlValue })) &&
      minMaxCardsUrlValue
    : valueForSlider

  const debounce = useDebounce({ value: searchValue, milliSeconds: milliSecondsValue })

  useEffect(() => {
    debounce &&
      utilityForSearchParamsEdit({
        param: 'name',
        valueForNewParam: debounce ? debounce : [],
      })
  }, [debounce]) //!!! Исправить

  const classNames = {
    decksPanel: s.decksPanel,
    searchInput: s.searchInput,
    slider: s.slider,
  }

  const handlerSliderCommitValue = (value: number[]) => {
    utilityForSearchParamsEdit({
      param: 'minCardsCount',
      param2: 'maxCardsCount',
      valueForNewParam: value[0] === 0 ? [] : value[0].toString(),
      valueForNewParam2: value[1] === 100 ? [] : value[1].toString(),
    })
  }
  const handlerValueChangeSlider = (value: number[]) => {
    dispatch(minMaxCardsCountReducer({ minMaxCardsCount: value }))
  }

  const handlerTextFieldChangeValue = (value: string) => {
    dispatch(findNameReducer({ findName: value }))
  }
  const handlerClearFilter = () => {
    dispatch(clearFilterReducer())
    setSearchParams('')
  }
  const handlerTabSwitchChangeValue = (value: string | string[]) => {
    utilityForSearchParamsEdit({
      param: 'authorId',
      valueForNewParam: value,
    })
  }

  return (
    <>
      <div className={classNames.decksPanel}>
        <div className={classNames.searchInput}>
          <TextField
            type={'search'}
            placeholder={'Input search'}
            onValueChange={handlerTextFieldChangeValue}
            value={isFirstRender ? findText : searchValue}
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
          onValueChange={value => handlerTabSwitchChangeValue(value === 'myCards' ? meID : [])}
        />
        <Slider
          className={classNames.slider}
          label={'Number of cards'}
          min={minCardsValue}
          max={maxCardsValue}
          onValueCommit={handlerSliderCommitValue}
          value={actualValueSlider}
          onValueChange={handlerValueChangeSlider}
        />
        <Button variant={'secondary'} onClick={handlerClearFilter}>
          <Delete /> Clear Filter
        </Button>
      </div>
    </>
  )
})
