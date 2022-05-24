import useSWR, { SWRConfiguration } from 'swr'
import fetcher from '../utilities/fetcher'

const useFetch = <Type>(key: string, id: string, options?: SWRConfiguration) => {
  const { data, mutate } = useSWR<Type>({ key, id }, fetcher, options)
  return { data, mutate }
}

export default useFetch
