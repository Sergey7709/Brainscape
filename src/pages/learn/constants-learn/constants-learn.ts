export const isGrade = (value: number): value is 1 | 2 | 3 | 4 | 5 => {
  return [1, 2, 3, 4, 5].includes(value)
}
