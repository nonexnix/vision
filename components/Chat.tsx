import { useEffect } from 'react'
import useSWR, { SWRConfiguration } from 'swr'
import { IMessage } from '../library/schemas/interfaces'
import useClientStore from '../library/stores/client'

interface IProps {
  initialMessages: IMessage[]
}

const Chat = ({ initialMessages }: IProps) => {
  const project = useClientStore((state) => state.project)
  const messages = useClientStore((state) => state.messages)

  const fetcher = async (endpoint: string): Promise<IMessage[]> => {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ projectId: project!.id }),
    })
    const data: IMessage[] = await response.json()
    return data
  }

  const config: SWRConfiguration = {
    fallbackData: initialMessages,
    refreshInterval: 100,
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
