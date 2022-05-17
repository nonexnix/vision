import Link from 'next/link'
import { useEffect, useState } from 'react'
import useSWR, { mutate, SWRConfiguration } from 'swr'
import { IUser } from '../library/schemas/interfaces'
import useClientStore from '../library/stores/client'

const ProjectForm = () => {
  const [input, setInput] = useState('')
  const user = useClientStore((state) => state.user)
  const create = useClientStore((state) => state.create.project)

  const config: SWRConfiguration = { fallbackData: user }

  const fetcher = async (endpoint: string) => {
    return await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ id: user.id }),
    }).then((response) => response.json())
  }

  const { data } = useSWR<IUser>('/api/user/read', fetcher, config)

  useEffect(() => {
    if (user !== data) {
      useClientStore.getState().read.user(data!)
    }
  }, [data])

  const createHandler = async () => {
    await create({
      name: input,
      description: 'Sample',
      dueAt: 'September 22, 2022',
      userId: user.id,
    })
    mutate('/api/user/read')
  }

  return (
    <div>
      <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
      <button onClick={createHandler}>Add Project</button>
      <div>
        {user.members?.map((member) => (
          <Link key={member.id} href={`/connect/${user.id}/view/${member.id}/dashboard`}>
            <div>{member.project?.name}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProjectForm
