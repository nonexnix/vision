import { memo, useEffect } from 'react'
import useSWR, { mutate, SWRConfiguration } from 'swr'
import { IUser } from '../library/schemas/interfaces'
import useClientStore from '../library/stores/client'

const ProjectForm = () => {
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
      name: 'Sample',
      description: 'Sample',
      dueAt: 'September 22, 2022',
      userId: user.id,
    })
    mutate('/api/user/read')
  }

  if (user !== data) return <></>

  return (
    <div>
      <button onClick={createHandler}>Add Project</button>
      <div>
        {user.members?.map((member) => (
          <div key={member.id}>{member.project?.name}</div>
        ))}
      </div>
    </div>
  )
}

export default ProjectForm
