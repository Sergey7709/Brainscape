import {
  authorCardsIDAbsent,
  findNameValue,
  itemsPerPageValue,
  maxCardsValue,
  minCardsValue,
} from '@/service'

type QueryString = {
  currentPage: number
  itemsPerPage: number
  minMaxCardsCount: number[]
  myOrAllAuthorCards: string
  findName: string
}
export const useQueryString = ({
  currentPage,
  itemsPerPage,
  minMaxCardsCount,
  myOrAllAuthorCards,
  findName,
}: QueryString) => {
  return [
    currentPage ? `currentPage=${currentPage}` : '',
    itemsPerPage !== itemsPerPageValue ? `itemsPerPage=${itemsPerPage}` : '',
    minMaxCardsCount[0] !== minCardsValue ? `minCardsCount=${minMaxCardsCount[0]}` : '',
    minMaxCardsCount[1] !== maxCardsValue ? `maxCardsCount=${minMaxCardsCount[1]}` : '',
    myOrAllAuthorCards !== authorCardsIDAbsent ? `authorId=${myOrAllAuthorCards}` : '',
    findName !== findNameValue ? `name=${findName}` : '',
  ]
    .filter(el => !!el)
    .join('&')
}
