import { useSearchParams } from 'react-router-dom'

import { currentPageParams } from '@/shared/constants/constantsForSearchParams.ts'

type UseUtilityForSearchParamsEdit = {
  param: string
  param2?: string
  valueForNewParam: string | string[]
  valueForNewParam2?: string | string[]
}

export const useUtilityForSearchParamsEdit = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (props: UseUtilityForSearchParamsEdit) => {
    const { param, param2 = '', valueForNewParam, valueForNewParam2 = '' } = props

    const {
      [param]: _,
      [param2]: __,
      currentPage,
      ...restOffSearchObject
    } = Object.fromEntries(searchParams)

    const urlParams = param2
      ? {
          ...restOffSearchObject,
          [param]: valueForNewParam,
          [param2]: valueForNewParam2,
        }
      : {
          ...restOffSearchObject,
          [param]: param === currentPageParams && valueForNewParam === '1' ? [] : valueForNewParam,
        }

    setSearchParams(urlParams)
  }
}
