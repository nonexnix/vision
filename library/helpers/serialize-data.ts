import { Prisma, User } from '@prisma/client'

type Data =
  | Prisma.UserInclude
  | Prisma.MemberInclude
  | Prisma.ProjectInclude
  | Prisma.MessageInclude[]

const serializeData = (data: Data | User[]) => JSON.parse(JSON.stringify(data))

export default serializeData
