import { RadioGroup } from '@/components/ui/radio-group'
import { optionsAnswer } from '@/pages/learn/constants-learn'

type RadioGroupAnswerProps = {
  handlerValueAnswer: (value: string) => void
  disabled?: boolean
}
export const RadioGroupAnswer = ({ handlerValueAnswer, disabled }: RadioGroupAnswerProps) => {
  const onValueChange = (value: string) => {
    handlerValueAnswer(value)
  }

  return (
    <>
      <RadioGroup options={optionsAnswer} onValueChange={onValueChange} disabled={disabled} />
    </>
  )
}
