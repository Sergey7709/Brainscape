import { memo, useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import s from './decks-panel.module.scss'

import { Delete } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { TabSwitcher } from '@/components/ui/tab-switcher'
import { TextField } from '@/components/ui/textField'
import { Typography } from '@/components/ui/typography'
import {
  clearFilterReducer,
  milliSecondsValue,
  searchParamsDeckUrl,
  useAppDispatch,
  useGetAuthUserMeDataQuery,
} from '@/service'
import { findNameReducer, minMaxCardsCountReducer } from '@/service/store/deckParamsSlice.ts'
import { useCombineAppSelector, useIsFirstRender, useUtilityForSearchParamsEdit } from '@/utils'
import { maxCardsValue, minCardsValue } from '@/utils/constants/constantsForInitialValue.ts'
import {
  maxCardsCountParams,
  minCardsCountParams,
  nameParams,
} from '@/utils/constants/constantsForSearchParams.ts'
import { useDebounce } from '@/utils/hooks/useDebounce.ts'

type MaxCardsInDecks = {
  maxCardsCount: number
}
export const DecksPanel = memo(({ maxCardsCount }: MaxCardsInDecks) => {
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()

  const { searchValue, valueForSlider } = useCombineAppSelector()

  const isFirstRender = useIsFirstRender()

  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()

  const { data: meData } = useGetAuthUserMeDataQuery()

  const meID = meData?.id ?? ''

  const myOrAllAuthorCards = searchParams.get('authorId') || 'allCards'

  const findText = searchParams.get(nameParams) || ''

  const minMaxCardsUrlValue = [
    Number(searchParams.get(minCardsCountParams) || valueForSlider[0]),
    Number(searchParams.get(maxCardsCountParams) || maxCardsCount || valueForSlider[1]),
  ]

  useEffect(() => {
    if (isFirstRender) {
      dispatch(minMaxCardsCountReducer({ minMaxCardsCount: minMaxCardsUrlValue }))
    }
  }, [isFirstRender])

  const actualValueSlider = isFirstRender ? minMaxCardsUrlValue : valueForSlider

  const debounce = useDebounce({ value: searchValue, milliSeconds: milliSecondsValue })

  useEffect(() => {
    debounce !== findText &&
      utilityForSearchParamsEdit({
        param: nameParams,
        valueForNewParam: debounce ? debounce : [],
      })
    isFirstRender && dispatch(findNameReducer({ findName: findText }))
  }, [debounce])

  const classNames = {
    decksPanel: s.decksPanel,
    searchInput: s.searchInput,
    slider: s.slider,
    textField: s.decksPanelTextField,
  }

  const handlerSliderCommitValue = (value: number[]) => {
    utilityForSearchParamsEdit({
      param: minCardsCountParams,
      param2: maxCardsCountParams,
      valueForNewParam: value[0] === minCardsValue ? [] : value[0].toString(),
      valueForNewParam2: value[1] === (maxCardsCount || maxCardsValue) ? [] : value[1].toString(),
    })
  }
  const handlerValueChangeSlider = (value: number[]) => {
    dispatch(minMaxCardsCountReducer({ minMaxCardsCount: value }))
  }

  const handlerTextFieldChangeValue = (value: string) => {
    dispatch(findNameReducer({ findName: value }))
  }
  const handlerClearFilter = () => {
    dispatch(minMaxCardsCountReducer({ minMaxCardsCount: [minCardsValue, maxCardsCount] }))
    dispatch(clearFilterReducer())
    setSearchParams('')
    sessionStorage.setItem(searchParamsDeckUrl, '')
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
            className={classNames.textField}
          />
        </div>
        <div className={s.decksPanelTabSwitcherWrapper}>
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
            className={s.decksPanelTabSwitcherWrapper}
          />
        </div>
        <Slider
          className={classNames.slider}
          label={'Number of cards'}
          min={minCardsValue}
          max={maxCardsCount}
          onValueCommit={handlerSliderCommitValue}
          value={actualValueSlider}
          onValueChange={handlerValueChangeSlider}
        />
        <div className={s.decksPanelButtonWrapper}>
          <Button variant={'secondary'} onClick={handlerClearFilter} className={s.decksPanelButton}>
            <Delete /> <Typography className={s.decksPanelClearFilter}>Clear Filter</Typography>
          </Button>
        </div>
      </div>
    </>
  )
})
