type UtilityAddFormDataCard = {
  form: {
    question: string
    answer: string
    questionImg?: any
    answerImg?: any
  }
  formData: FormData
}
export const utilityAddFormDataCard = ({ form, formData }: UtilityAddFormDataCard) => {
  Object.entries(form).forEach(([key, value]) => {
    const isString = typeof value === 'string'
    const isNotURL = isString && !value.startsWith('https://')

    if (value instanceof FileList && value.length > 0) {
      formData.append(key, value[0])
    } else if (isString && isNotURL) {
      formData.append(key, value)
    } else if (value === null || value === undefined) {
      formData.append(key, '')
    }
  })
}
