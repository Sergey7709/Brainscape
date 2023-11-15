import { useSearchParams } from 'react-router-dom'

export const utilitySearchParams = () => {
  const [searchParams] = useSearchParams()

  return `${searchParams.toString()}`
}
