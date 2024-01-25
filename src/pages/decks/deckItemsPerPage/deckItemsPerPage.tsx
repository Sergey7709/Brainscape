import { useSearchParams } from 'react-router-dom'

import s from './deckItemsPerPage.module.scss'

import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { optionsForDeckItemsPerPage } from '@/pages/decks/constantsDeck.ts'
import { selectItemsPerPageReducer, useAppDispatch } from '@/service'
import { useCombineAppSelector, useUtilityForSearchParamsEdit } from '@/utils'
import { itemsPerPageParams } from '@/utils/constants/constantsForSearchParams.ts'

export const DeckItemsPerPage = () => {
  const { selectItemsPerPage } = useCombineAppSelector()
  const dispatch = useAppDispatch()
  const utilityForSearchParamsEdit = useUtilityForSearchParamsEdit()
  const [searchParams] = useSearchParams()
  const paginationSelectValueInURL = searchParams.get(itemsPerPageParams) || selectItemsPerPage

  const handlerSelectPagination = (items: string) => {
    utilityForSearchParamsEdit({
      param: itemsPerPageParams,
      valueForNewParam: items,
    })
    dispatch(selectItemsPerPageReducer({ selectItemsPerPage: items }))
  }

  return (
    <div className={s.selectWrapper}>
      <Typography className={s.deckItemTypography}>Show</Typography>
      <Select
        options={optionsForDeckItemsPerPage}
        variant={'pagination'}
        onValueChange={handlerSelectPagination}
        value={paginationSelectValueInURL}
      />
      <Typography className={s.deckItemTypography}>on page</Typography>
    </div>
  )
}
