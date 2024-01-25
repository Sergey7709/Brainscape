import { Column } from '@/components/ui/tables'
import {
  cardsCountParams,
  nameParams,
  updatedParams,
} from '@/utils/constants/constantsForSearchParams.ts'

export const columnsDecks: Column[] = [
  {
    key: nameParams,
    title: 'Name',
    sortable: true,
  },
  {
    key: cardsCountParams,
    title: 'Cards',
    sortable: true,
  },
  {
    key: updatedParams,
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'author.name',
    title: 'Created by',
    sortable: true,
  },
  {
    key: 'options',
    title: '',
  },
]

export const optionsForDeckItemsPerPage = ['5', '10', '20', '30', '50', '100']

export const FILE_SIZE_LIMIT = 1000 * 1000
