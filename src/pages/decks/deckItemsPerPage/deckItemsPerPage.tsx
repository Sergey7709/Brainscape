import { useSearchParams } from 'react-router-dom'

import s from './../decks.module.scss'

import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { optionsForDeckItemsPerPage } from '@/pages/decks/constantsDeck.ts'
import { selectItemsPerPageReducer, useAppDispatch } from '@/service'
import { useCombineAppSelector, useUtilityForSearchParamsEdit } from '@/utils'

export const DeckItemsPerPage = () => {
  const { selectItemsPerPage } = useCombineAppSelector()
  const dispatch = useAppDispatch()
  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()
  const [searchParams] = useSearchParams()
  const paginationSelectValueInURL = searchParams.get('itemsPerPage') || selectItemsPerPage

  const handlerSelectPagination = (items: string) => {
    utilityForSearchParamsEdit({
      param: 'itemsPerPage',
      valueForNewParam: items,
    })
    dispatch(selectItemsPerPageReducer({ selectItemsPerPage: items }))
  }

  return (
    <div className={s.selectWrapper}>
      <Typography variant={'body1'}>Показать</Typography>
      <Select
        options={optionsForDeckItemsPerPage}
        variant={'pagination'}
        onValueChange={handlerSelectPagination}
        value={paginationSelectValueInURL}
      />
      <Typography variant={'body1'}>на странице</Typography>
    </div>
  )
}
