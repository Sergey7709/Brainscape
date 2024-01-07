import { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { TextField } from '@/components/ui/textField'
import s from '@/pages/pack/pack.module.scss'
import { milliSecondsValue, packFindNameReducer, useAppDispatch } from '@/service'
import {
  useCombineAppSelector,
  useDebounce,
  useIsFirstRender,
  useUtilityForSearchParamsEdit,
} from '@/utils'

export const PackSearch = () => {
  const dispatch = useAppDispatch()
  const { packSearchValue } = useCombineAppSelector()
  const [searchParams] = useSearchParams()
  const findText = searchParams.get('question') || ''
  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()
  const debounce = useDebounce({ value: packSearchValue, milliSeconds: milliSecondsValue })
  const isFirstRender = useIsFirstRender()

  useEffect(() => {
    debounce !== findText &&
      utilityForSearchParamsEdit({
        param: 'question',
        valueForNewParam: debounce ? debounce : [],
      })
    isFirstRender && dispatch(packFindNameReducer({ packFindName: findText }))
  }, [debounce])

  const handlerTextFieldChangeValue = (value: string) => {
    dispatch(packFindNameReducer({ packFindName: value }))
  }

  return (
    <div className={s.inputPackRowWrapper}>
      <TextField
        type={'search'}
        placeholder={'Input search'}
        onValueChange={handlerTextFieldChangeValue}
        value={isFirstRender ? findText : packSearchValue}
        className={s.packSearch}
      />
    </div>
  )
}
