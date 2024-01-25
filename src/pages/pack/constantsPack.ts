import { Column } from '@/components/ui/tables'
import { questionParams } from '@/utils/constants/constantsForSearchParams.ts'

export const columnsPack: Column[] = [
  {
    key: questionParams,
    title: 'Question',
    sortable: true,
  },
  {
    key: 'answer',
    title: 'Answer',
    sortable: true,
  },
  {
    key: 'updated',
    title: 'Last Updated',
    sortable: true,
  },
  {
    key: 'grade',
    title: 'Grade',
    sortable: true,
  },
  {
    key: 'options',
    title: '',
  },
]
