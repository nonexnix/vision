import cuid from 'cuid'
import { useEffect } from 'react'
import useFetch from '../../library/hooks/fetch'
import { IMessage } from '../../library/schemas/interfaces'
import useClientStore from '../../library/stores/client'
import useFieldStore from '../../library/stores/field'

const Chatbox = () => {
  const member = useClientStore((state) => state.member)
  const project = useClientStore((state) => state.project)
  const messages = useClientStore((state) => state.messages)
  const messageField = useFieldStore((state) => state.message)
  const create = useClientStore((state) => state.create.message)

  const { data, mutate } = useFetch<IMessage[]>('/api/message/read', project.id, {
    fallbackData: messages,
    refreshInterval: 20000,
  })

  console.log(member)
  
  useEffect(() => {
    if (JSON.stringify(messages) !== JSON.stringify(data)) {
      useClientStore.getState().read.messages(data!)
    }
  }, [messages, data])

  if (JSON.stringify(messages) !== JSON.stringify(data)) return <></>

  console.log('Chatbox Rendered', messages)

  const handler = () => {
    if (messageField.value.text) {
      const newData: IMessage = { ...messageField.value, id: cuid(), member: member }
      messageField.clear()
      mutate([...messages!, newData], false)
      create({
        text: newData.text,
        memberId: member.id,
        projectId: project.id,
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-300 p-5 space-y-3 overflow-scroll">
      <div className="flex flex-col gap-2 sticky top-0 bg-slate-200">
        <input
          type="text"
          value={messageField.value.text}
          onChange={(event) => messageField.set({ ...messageField.value, text: event.target.value })}
        />
        <button className="py-2 px-3 rounded bg-orange-500 text-white" onClick={handler}>
          Send
        </button>
      </div>
      <div className="grid gap-2">
        {messages?.map((message) => (
          <div
            key={message.id}
            className={`${
              message.member?.id === member.id
                ? 'bg-blue-500 text-white ml-auto text-right'
                : 'bg-gray-500 text-white mr-auto text-left'
            } py-2 px-3 rounded`}>
            <div className="text-right">{message.text}</div>
            <div className="text-right">{message.member?.user?.username}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chatbox
