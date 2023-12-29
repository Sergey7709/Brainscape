import { z } from 'zod'

import { FILE_SIZE_LIMIT } from '@/pages/decks/constantsDeck.ts'

export const utilityZodCardSchema = () => {
  const fileSchema = z.any().refine((fileList: FileList | string) => {
    return (
      typeof fileList === 'string' ||
      (fileList instanceof FileList && fileList[0]?.size <= FILE_SIZE_LIMIT)
    )
  }, `Error, max file size is 1MB.`)

  const addNewCardSchema = z.object({
    question: z
      .string({
        required_error: 'Question is required',
      })
      .trim()
      .nonempty('Question is required')
      .min(3, 'Question must be at least 3 characters')
      .max(30),
    answer: z
      .string({
        required_error: 'Answer is required',
      })
      .trim()
      .nonempty('Answer is required')
      .min(3, 'Answer must be at least 3 characters')
      .max(30),

    questionImg: fileSchema.optional(),
    answerImg: fileSchema.optional(),
  })

  type NewCardSchema = z.infer<typeof addNewCardSchema>

  const initialValues: NewCardSchema = {
    question: '',
    questionImg: undefined,
    answer: '',
    answerImg: undefined,
  }

  return { initialValues, addNewCardSchema }
}
