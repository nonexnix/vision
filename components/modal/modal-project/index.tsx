import { useEffect } from 'react'
import useSWR, { SWRConfiguration } from 'swr'
import { IUser } from '../../../library/schemas/interfaces'
import useClientStore from '../../../library/stores/client'

const ModalProject = () => {
  const user = useClientStore((state) => state.user)

  const config: SWRConfiguration = { fallbackData: user }

  const fetcher = async (endpoint: string) => {
    return await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ id: user.id }),
    }).then((response) => response.json())
  }

  const { data, mutate } = useSWR<IUser>('/api/user/read', fetcher, config)

  useEffect(() => {
    if (user !== data) {
      useClientStore.getState().read.user(data!)
    }
  }, [data])

  return <div></div>
}

export default ModalProject
