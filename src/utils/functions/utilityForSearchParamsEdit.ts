import { SetURLSearchParams } from 'react-router-dom'

import { currentPageValue, maxCardsValue, minCardsValue } from '@/utils'

type UtilityForSearchParamsEdit = {
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
  param: string
  param2?: string
  valueForNewParam: string
  valueForNewParam2?: string
}

const maxCardsValueString = maxCardsValue.toString()
const currentPageValueString = currentPageValue.toString()

export const utilityForSearchParamsEdit = (props: UtilityForSearchParamsEdit) => {
  const {
    searchParams,
    setSearchParams,
    param,
    param2 = maxCardsValueString,
    valueForNewParam,
    valueForNewParam2 = maxCardsValueString,
  } = props

  const urlQueryParamValue = searchParams.get(param)

  const { [param]: _, [param2]: __, ...restOffSearchObject } = Object.fromEntries(searchParams)

  switch (param) {
    case 'authorId':
      if (urlQueryParamValue) {
        setSearchParams(restOffSearchObject)
      } else if (!urlQueryParamValue && valueForNewParam) {
        setSearchParams({
          ...restOffSearchObject,
          currentPage: currentPageValueString,
          [param]: valueForNewParam,
        })
      }

      break

    case 'currentPage':
      if (urlQueryParamValue !== valueForNewParam) {
        setSearchParams({ ...restOffSearchObject, [param]: valueForNewParam })
      }

      break

    case 'minCardsCount' || 'maxCardsCount':
      if (Number(valueForNewParam) === minCardsValue || Number(valueForNewParam) === null) {
        setSearchParams({
          ...restOffSearchObject,
          currentPage: currentPageValueString,
          maxCardsCount: valueForNewParam2,
        })
      } else if (Number(valueForNewParam2) === maxCardsValue) {
        setSearchParams({
          ...restOffSearchObject,
          currentPage: currentPageValueString,
          minCardsCount: valueForNewParam,
        })
      } else {
        setSearchParams({
          ...restOffSearchObject,
          currentPage: currentPageValueString,
          minCardsCount: valueForNewParam,
          maxCardsCount: valueForNewParam2,
        })
      }

      break

    case 'name':
      if (valueForNewParam) {
        setSearchParams({
          ...restOffSearchObject,
          currentPage: currentPageValueString,
          [param]: valueForNewParam,
        })
      }
      break

    case 'orderBy':
      if (valueForNewParam) {
        setSearchParams({ ...restOffSearchObject, [param]: valueForNewParam })
      } else if (!valueForNewParam) {
        setSearchParams(restOffSearchObject)
      }
      break

    default:
      return null
  }
}
