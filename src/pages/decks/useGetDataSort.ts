import { useMemo, useState } from 'react'

import { Sort } from '@/components/ui/tables'
import { useGetDecksQuery } from '@/service'

export const useGetDataSort = () => {
  const { data, isSuccess, isLoading } = useGetDecksQuery()
  const [sort, setSort] = useState<Sort>(null)
  const sortString: string | null = sort ? `${sort?.key}-${sort?.direction}` : null
  // const [key, direction] = sortString ? sortString.split('-') : []
  const sortedData = useMemo(() => {
    if (isSuccess && !!data.items) {
      // if (!sortString) {
      //   return data.items
      // }
      // const [key, direction] = sortString.split('-')
      //
      // return [...data.items].sort((a, b) => {
      //   if (direction === 'asc') {
      //     return a[key as keyof typeof a] > b[key as keyof typeof b] ? 1 : -1
      //   }
      //
      //   return a[key as keyof typeof a] < b[key as keyof typeof b] ? 1 : -1
      // })
      if (!sortString) {
        return data.items
      }
      const [key, direction] = sortString.split('-')

      return [...data.items].sort((a, b) => {
        if (direction === 'asc') {
          return a[key as keyof typeof a] > b[key as keyof typeof b] ? 1 : -1
        }

        return a[key as keyof typeof a] < b[key as keyof typeof b] ? 1 : -1
      })
    } else {
      return []
    }
  }, [sortString, data, isSuccess])

  return { sort, setSort, isSuccess, sortedData, isLoading }
}
