import { useSearchParams } from 'react-router-dom'

import { Sort } from '@/components/ui/tables'
import { orderByValue } from '@/utils'

export const useDataSort = () => {
  const [searchParams] = useSearchParams()
  const sortString = searchParams.get('orderBy') ?? orderByValue

  const [key, direction] = sortString.split('-')
  const sort = { key, direction } as Sort

  return { sort }
}
