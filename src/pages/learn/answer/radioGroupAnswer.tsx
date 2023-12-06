import { RadioGroup } from '@/components/ui/radio-group'

const optionsAnswer = [
  { label: 'Did not know', value: '1' },
  { label: 'Forgot', value: '2' },
  { label: 'A lot of thought', value: '3' },
  { label: 'Confused', value: '4' },
  { label: 'Knew the answer', value: '5' },
]

type RadioGroupAnswerProps = {
  handlerValueAnswer: (value: string) => void
}
export const RadioGroupAnswer = ({ handlerValueAnswer }: RadioGroupAnswerProps) => {
  const onValueChange = (value: string) => {
    handlerValueAnswer(value)
  }

  return (
    <>
      <RadioGroup options={optionsAnswer} onValueChange={onValueChange} />
    </>
  )
}
