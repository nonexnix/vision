import useSWR, { SWRConfiguration } from 'swr'

export const fetcher = async (key: string) => {
  const response = await fetch(key)
  const data = await response.json()
  return data
}

const useFetch = <Type>(key: string, options: SWRConfiguration) => {
  return useSWR<Type>(key, fetcher, options)
}

export default useFetch
