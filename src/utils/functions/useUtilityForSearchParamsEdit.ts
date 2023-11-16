import { useSearchParams } from 'react-router-dom'

import { currentPageValue } from '@/utils'

type UseUtilityForSearchParamsEdit = {
  param: string
  param2?: string
  valueForNewParam: string | string[]
  valueForNewParam2?: string | string[]
}

const currentPageValueString = currentPageValue.toString()

export const useUtilityForSearchParamsEdit = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (props: UseUtilityForSearchParamsEdit) => {
    const { param, param2 = '', valueForNewParam, valueForNewParam2 = '' } = props

    const { [param]: _, [param2]: __, ...restOffSearchObject } = Object.fromEntries(searchParams)

    const urlParams = param2
      ? {
          ...restOffSearchObject,
          currentPage: currentPageValueString,
          [param]: valueForNewParam,
          [param2]: valueForNewParam2,
        }
      : {
          ...restOffSearchObject,
          currentPage: currentPageValueString,
          [param]: valueForNewParam,
        }

    setSearchParams(urlParams)
  }
}
