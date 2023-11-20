import { useState, useEffect } from 'react'

type UseDebounceProps<T> = {
  value: T
  milliSeconds: number
}
export const useDebounce = <T>({ value, milliSeconds }: UseDebounceProps<T>): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, milliSeconds)

    return () => {
      clearTimeout(handler)
    }
  }, [value, milliSeconds])

  return debouncedValue
}
