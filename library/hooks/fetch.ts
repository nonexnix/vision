import useSWR, { SWRConfiguration } from 'swr'
import fetcher from '../utilities/fetcher'

const useFetch = <Type>(key: string, id: string, options?: SWRConfiguration) => {
  const { data } = useSWR<Type>({ key, id }, fetcher, options)
  return { data }
}

export default useFetch
