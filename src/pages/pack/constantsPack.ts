import { Column } from '@/components/ui/tables'
import {
  answerParams,
  questionParams,
  updatedParams,
} from '@/shared/constants/constantsForSearchParams.ts'

export const columnsPack: Column[] = [
  {
    key: questionParams,
    title: 'Question',
    sortable: true,
  },
  {
    key: answerParams,
    title: 'Answer',
    sortable: true,
  },
  {
    key: updatedParams,
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
