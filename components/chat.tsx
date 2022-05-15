import { useEffect } from 'react'
import useSWR from 'swr'
import type { IMessage } from '../library/schemas/interfaces'
import useClientStore from '../library/stores/client'

interface IChat {
  initialMessages: IMessage[]
  projectId: string
}

const Chat = ({ initialMessages, projectId }: IChat) => {
  const fetcher = async (endpoint: string) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ projectId }),
    })
    const data = await response.json()
    return data
  }

  const { data, error } = useSWR('/api/messages/read', fetcher, {
    fallbackData: initialMessages,
    refreshInterval: 200,
  })

  useEffect(() => {
    useClientStore.getState().read.messages(data)
  }, [data])

  if (!data) return <></>

  console.log(data)

  return <div>Chat</div>
}

export default Chat
