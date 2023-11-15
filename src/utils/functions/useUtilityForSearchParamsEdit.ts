import { useSearchParams } from 'react-router-dom'

import { currentPageValue, maxCardsValue } from '@/utils'

type UseUtilityForSearchParamsEdit = {
  param: string
  param2?: string
  valueForNewParam: string | string[]
  valueForNewParam2?: string | string[]
}

const maxCardsValueString = maxCardsValue.toString()
const currentPageValueString = currentPageValue.toString()

export const useUtilityForSearchParamsEdit = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (props: UseUtilityForSearchParamsEdit) => {
    const {
      param,
      param2 = maxCardsValueString,
      valueForNewParam,
      valueForNewParam2 = maxCardsValueString,
    } = props

    const { [param]: _, [param2]: __, ...restOffSearchObject } = Object.fromEntries(searchParams)

    console.log('param', param)

    switch (param) {
      case 'authorId':
        {
          setSearchParams({
            ...restOffSearchObject,
            currentPage: currentPageValueString,
            [param]: valueForNewParam,
          })
        }

        break

      case 'currentPage':
        {
          setSearchParams({ ...restOffSearchObject, [param]: valueForNewParam })
        }

        break

      case 'minCardsCount' || 'maxCardsCount': {
        setSearchParams({
          ...restOffSearchObject,
          currentPage: currentPageValueString,
          [param]: valueForNewParam,
          [param2]: valueForNewParam2,
        })

        break
      }

      case 'name':
        {
          setSearchParams({
            ...restOffSearchObject,
            currentPage: currentPageValueString,
            [param]: valueForNewParam,
          })
        }

        break

      case 'orderBy':
        {
          setSearchParams({
            ...restOffSearchObject,
            currentPage: currentPageValueString,
            [param]: valueForNewParam,
          })
        }

        break

      default:
        return null
    }
  }
}
