import { useEffect } from 'react'
import useSWR from 'swr'
import { IMessage } from '../library/schemas/interfaces'
import useClientStore from '../library/stores/client'

interface IChat {
  initialMessages: IMessage[]
}

const Chat = ({ initialMessages }: IChat) => {
  const project = useClientStore((state) => state.project)
  const messages = useClientStore((state) => state.messages)

  const fetcher = async (endpoint: string) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ projectId: project!.id }),
    })
    const data = await response.json()
    return data
  }

  const { data } = useSWR('/api/message/read', fetcher, {
    fallbackData: initialMessages,
    refreshInterval: 200,
  })

  useEffect(() => {
    if (!messages) useClientStore.getState().read.messages(data)
  }, [data, messages])

  if (!data || !messages) return <></>

  console.log(data)

  return <div>Chat</div>
}

export default Chat
