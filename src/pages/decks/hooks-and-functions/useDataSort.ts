import { useSearchParams } from 'react-router-dom'

import { Sort } from '@/components/ui/tables'
import { orderByValue } from '@/utils'

// type DataSort = {
//   isSuccess: boolean
//   data: (GetEntitiesResponse<DeckType> & { maxCardsCount: number }) | undefined
// }
// export const useDataSort = (props: DataSort) => {
export const useDataSort = () => {
  // const { isSuccess, data } = props

  const [searchParams] = useSearchParams()
  const sortString = searchParams.get('orderBy') ?? orderByValue

  const [key, direction] = sortString.split('-')
  const sort = { key, direction } as Sort

  // const sortedData = useMemo(() => {
  //   if (isSuccess && data?.items) {
  //     if (sortString) {
  //       return [...data.items].sort((a, b) => {
  //         const [key, direction] = sortString.split('-')
  //         const isAsc = direction === 'asc'
  //
  //         const aValue = a[key as keyof typeof a]
  //         const bValue = b[key as keyof typeof b]
  //
  //         const result = aValue > bValue ? 1 : -1
  //
  //         return isAsc ? result : -result
  //       })
  //     } else {
  //       return data.items
  //     }
  //   } else {
  //     return []
  //   }
  // }, [sortString, data])

  // return { sortedData, sort }
  return { sort }
}
