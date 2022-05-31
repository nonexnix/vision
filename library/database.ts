import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient
}

let database: PrismaClient

if (process.env.NODE_ENV === 'production') {
  database = new PrismaClient()
} else {
  if (!global.prisma) global.prisma = new PrismaClient()
  database = global.prisma
}

export default database
