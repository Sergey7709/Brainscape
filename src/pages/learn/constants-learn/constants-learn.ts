export const isGrade = (value: number): value is 1 | 2 | 3 | 4 | 5 => {
  return [1, 2, 3, 4, 5].includes(value)
}
export const optionsAnswer = [
  { label: 'Did not know', value: '1' },
  { label: 'Forgot', value: '2' },
  { label: 'A lot of thought', value: '3' },
  { label: 'Confused', value: '4' },
  { label: 'Knew the answer', value: '5' },
]
