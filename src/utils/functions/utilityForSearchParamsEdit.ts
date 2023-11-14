import { SetURLSearchParams } from 'react-router-dom'

type UtilityForSearchParamsEdit = {
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
  param: string
  param2?: string
  valueForNewParam: string
  valueForNewParam2?: string
}
export const utilityForSearchParamsEdit = (props: UtilityForSearchParamsEdit) => {
  const {
    searchParams,
    setSearchParams,
    param,
    param2 = '100',
    valueForNewParam,
    valueForNewParam2 = '100',
  } = props

  const urlQueryParamValue = searchParams.get(param)

  const { [param]: _, [param2]: __, ...restOffSearchObject } = Object.fromEntries(searchParams)

  switch (param) {
    case 'authorId':
      if (urlQueryParamValue) {
        setSearchParams(restOffSearchObject)
      } else if (!urlQueryParamValue && valueForNewParam) {
        setSearchParams({ ...restOffSearchObject, currentPage: '1', [param]: valueForNewParam })
      }

      break

    case 'currentPage':
      if (urlQueryParamValue !== valueForNewParam) {
        setSearchParams({ ...restOffSearchObject, [param]: valueForNewParam })
      }

      break

    case 'minCardsCount' || 'maxCardsCount':
      if (Number(valueForNewParam) === 0 || Number(valueForNewParam) === null) {
        setSearchParams({
          ...restOffSearchObject,
          currentPage: '1',
          maxCardsCount: valueForNewParam2,
        })
      } else if (Number(valueForNewParam2) === 100) {
        setSearchParams({
          ...restOffSearchObject,
          currentPage: '1',
          minCardsCount: valueForNewParam,
        })
      } else {
        setSearchParams({
          ...restOffSearchObject,
          currentPage: '1',
          minCardsCount: valueForNewParam,
          maxCardsCount: valueForNewParam2,
        })
      }

      break

    case 'name':
      if (valueForNewParam) {
        setSearchParams({ ...restOffSearchObject, currentPage: '1', [param]: valueForNewParam })
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
