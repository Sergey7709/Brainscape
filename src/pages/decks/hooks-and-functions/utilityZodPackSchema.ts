import { z } from 'zod'

import { FILE_SIZE_LIMIT } from '@/pages/decks/constantsDeck.ts'

export const utilityZodPackSchema = (isPrivate?: boolean, titlePack?: string) => {
  const fileSchema = z
    .any()
    .refine(fileList => fileList[0]?.size <= FILE_SIZE_LIMIT, `Max file size is 1MB.`)

  const addNewPackSchema = z.object({
    namePack: z
      .string({
        required_error: 'Name is required',
      })
      .trim()
      .nonempty('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(30),

    privatePack: z.boolean().optional(),
    imageCover: fileSchema.optional(),
  })

  type NewPackSchema = z.infer<typeof addNewPackSchema>

  const initialValues: NewPackSchema = {
    imageCover: undefined,
    namePack: titlePack ?? '',
    privatePack: isPrivate ?? false,
  }

  return { initialValues, addNewPackSchema }
}
