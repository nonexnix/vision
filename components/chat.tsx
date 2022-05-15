import { useEffect } from 'react'
import useSWR from 'swr'
import useClientStore from '../library/stores/client'

const Chat = () => {
  const user = useClientStore((state) => state.user)!
  const projectId = user.members![0].project!.id

  const fetcher = async (endpoint: string) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ projectId }),
    })
    const data = await response.json()
    return data
  }

  const { data } = useSWR('/api/messages/read', fetcher, {
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
