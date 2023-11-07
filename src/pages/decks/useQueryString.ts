import { authorCardsIDAbsent, itemsPerPageValue, maxCardsValue, minCardsValue } from '@/service'

type QueryString = {
  currentPage: number
  itemsPerPage: number
  minMaxCardsCount: number[]
  myOrAllAuthorCards: string
}
export const useQueryString = ({
  currentPage,
  itemsPerPage,
  minMaxCardsCount,
  myOrAllAuthorCards,
}: QueryString) => {
  return [
    currentPage ? `currentPage=${currentPage}` : '',
    itemsPerPage !== itemsPerPageValue ? `itemsPerPage=${itemsPerPage}` : '',
    minMaxCardsCount[0] !== minCardsValue ? `minCardsCount=${minMaxCardsCount[0]}` : '',
    minMaxCardsCount[1] !== maxCardsValue ? `maxCardsCount=${minMaxCardsCount[1]}` : '',
    myOrAllAuthorCards !== authorCardsIDAbsent ? `authorId=${myOrAllAuthorCards}` : '',
  ]
    .filter(el => !!el)
    .join('&')
}
