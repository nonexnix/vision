import { useEffect } from 'react'
import useSWR, { SWRConfiguration } from 'swr'
import { IMessage } from '../../library/schemas/interfaces'
import useClientStore from '../../library/stores/client'

const Chatbox = () => {
  const project = useClientStore((state) => state.project)
  const messages = useClientStore((state) => state.messages)

  const config: SWRConfiguration = {
    fallbackData: messages,
    refreshInterval: 100,
  }

  const fetcher = async (endpoint: string): Promise<IMessage[]> => {
    return await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ projectId: project!.id }),
    }).then((response) => response.json())
  }

  const { data, mutate } = useSWR<IMessage[]>('/api/message/read', fetcher, config)

  useEffect(() => {
    if (messages !== data) {
      useClientStore.getState().read.messages(data!)
    }
  }, [data])

  console.log(messages)

  return <div></div>
}

export default Chatbox
