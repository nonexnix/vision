import { useEffect, useState } from 'react'
import useSWR, { SWRConfiguration } from 'swr'
import { IMessage } from '../../library/schemas/interfaces'
import useClientStore from '../../library/stores/client'

const Chatbox = () => {
  const [input, setInput] = useState('')
  const user = useClientStore((state) => state.user)
  const project = useClientStore((state) => state.project)
  const messages = useClientStore((state) => state.messages)
  const create = useClientStore((state) => state.create.message)

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
    if (data! !== messages) {
      useClientStore.getState().read.messages(data!)
    }
  }, [data])

  const createHandler = async () => {
    mutate(
      [
        ...messages,
        {
          id: '',
          text: input,
          memberId: user.members![0].id,
          projectId: project.id,
          createdAt: '',
          updatedAt: '',
        },
      ],
      false
    )
    await create({
      text: input,
      memberId: user.members![0].id,
      projectId: project.id,
    })
  }

  return (
    <div>
      <h1>Chat</h1>
      <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
      <button onClick={createHandler}>Send Message</button>
      <div>
        {messages.map((message) => (
          <div key={message.id}>{message.text}</div>
        ))}
      </div>
    </div>
  )
}

export default Chatbox
