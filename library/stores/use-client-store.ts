import { Prisma } from '@prisma/client'
import create from 'zustand'

type UseClientStore = {
  user: Prisma.UserInclude
  member: Prisma.MemberInclude
  project: Prisma.ProjectInclude
  messages: Prisma.MessageInclude[]
  read: (
    payload:
      | { key: 'user'; value: Prisma.UserInclude }
      | { key: 'member'; value: Prisma.MemberInclude }
      | { key: 'project'; value: Prisma.ProjectInclude }
      | { key: 'messages'; value: Prisma.MessageInclude[] }
  ) => void
}

const useClientStore = create<UseClientStore>((set) => ({
  user: {},
  member: {},
  project: {},
  messages: [],
  read: (payload) => set({ [payload.key]: payload.value }),
}))

export default useClientStore
