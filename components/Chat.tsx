import { useEffect } from 'react'
import useSWR, { SWRConfiguration, mutate } from 'swr'
import { IMessage } from '../library/schemas/interfaces'
import useClientStore from '../library/stores/client'

interface IProps {
  initialMessages: IMessage[]
}

const Chat = ({ initialMessages }: IProps) => {
  const project = useClientStore((state) => state.project)
  const messages = useClientStore((state) => state.messages)

  const config: SWRConfiguration = {
    fallbackData: initialMessages,
    refreshInterval: 100,
  }

  const fetcher = async (endpoint: string): Promise<IMessage[]> => {
    return await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ projectId: project!.id }),
    }).then((response) => response.json())
  }

  const { data } = useSWR<IMessage[]>('/api/message/read', fetcher, config)

  useEffect(() => {
    if (data!.length !== messages.length) {
      useClientStore.getState().read.messages(data!)
    }
  }, [data])

  if (data!.length !== messages.length) return <></>

  console.log('state', messages)

  return (
    <div>
      <h1>Chat</h1>
    </div>
  )
}

export default Chat
