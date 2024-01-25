import { useSearchParams } from 'react-router-dom'

import { Sort } from '@/components/ui/tables'
import { orderByValue } from '@/shared'
import { orderByParams } from '@/shared/constants/constantsForSearchParams.ts'

export const useDataSort = () => {
  const [searchParams] = useSearchParams()
  const sortString = searchParams.get(orderByParams) ?? orderByValue

  const [key, direction] = sortString.split('-')
  const sort = { key, direction } as Sort

  return { sort }
}
