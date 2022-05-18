import { useEffect } from 'react'
import useFetch from '../../library/hooks/fetch'
import { IMessage } from '../../library/schemas/interfaces'
import useClientStore from '../../library/stores/client'

const Chatbox = ({ initialMessages, projectId }: any) => {
  const { data: messages } = useFetch<IMessage[]>('/api/message/read', projectId, {
    fallbackData: initialMessages,
    refreshInterval: 100,
  })

  useEffect(() => {
    useClientStore.getState().read.messages(messages!)
  }, [messages])

  console.log('Chatbox Rendered', messages)

  return <div className="fixed"></div>
}

export default Chatbox
