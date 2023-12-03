import { useSearchParams } from 'react-router-dom'

import s from './../decks.module.scss'

import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { selectItemsPerPageReducer, useAppDispatch } from '@/service'
import { useCombineAppSelector, useUtilityForSearchParamsEdit } from '@/utils'

const options = ['5', '10', '20', '30', '50', '100']

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
        options={options}
        variant={'pagination'}
        onValueChange={handlerSelectPagination}
        value={paginationSelectValueInURL}
      />
      <Typography variant={'body1'}>на странице</Typography>
    </div>
  )
}
