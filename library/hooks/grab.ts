import useSWR, { SWRConfiguration } from 'swr'
import fetcher from '../utilities/fetcher'

const useGrab = (key: string, id: string, options?: SWRConfiguration) => {
  const { data } = useSWR({ key, id }, fetcher, options)
  return { data }
}

export default useGrab
