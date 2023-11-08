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
  minMaxCardsCount: number[] //!!!!!!!!! доработать типизацию
  myOrAllAuthorCards: string
  findName: string
  orderBy: string //!!!!!!!!! доработать типизацию
}
export const useQueryString = ({
  currentPage,
  itemsPerPage,
  minMaxCardsCount,
  myOrAllAuthorCards,
  findName,
  orderBy,
}: QueryString) => {
  return [
    currentPage ? `currentPage=${currentPage}` : '',
    itemsPerPage !== itemsPerPageValue ? `itemsPerPage=${itemsPerPage}` : '',
    minMaxCardsCount[0] !== minCardsValue ? `minCardsCount=${minMaxCardsCount[0]}` : '',
    minMaxCardsCount[1] !== maxCardsValue ? `maxCardsCount=${minMaxCardsCount[1]}` : '',
    myOrAllAuthorCards !== authorCardsIDAbsent ? `authorId=${myOrAllAuthorCards}` : '',
    findName !== findNameValue ? `name=${findName}` : '',
    orderBy ? `orderBy=${orderBy}` : '',
  ]
    .filter(el => !!el)
    .join('&')
}
