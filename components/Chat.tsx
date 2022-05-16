import { useEffect } from 'react'
import useSWR, { SWRConfiguration } from 'swr'
import { IMessage, IProject } from '../library/schemas/interfaces'
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
    refreshInterval: 200,
  }

  const { data } = useSWR<IMessage[]>('/api/message/read', fetcher, config)

  useEffect(() => {
    if (!messages) useClientStore.getState().read.messages(data!)
  }, [data, messages])

  if (!data || !messages) return <></>

  console.log(data)

  return <div>Chat</div>
}

export default Chat
