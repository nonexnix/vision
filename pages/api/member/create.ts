import { NextApiRequest, NextApiResponse } from 'next'
import postman from '../../../library/utilities/postman'
import prisma from '../../../library/utilities/prisma'

type THandler = (request: NextApiRequest, response: NextApiResponse) => void

const handler: THandler = async (request, response) => {
  if (request.method === 'POST') {
    const body = JSON.parse(request.body)
    try {
      const roles = await prisma.role.findMany({
        where: { projectId: body.projectId },
      })
      await prisma.member.create({
        data: {
          userId: body.userId,
          projectId: body.projectId,
          authorizations: {
            create: { roleId: roles.filter((role) => role.name === 'Member')[0].id },
          },
        },
      })
      response.status(201).json(postman(201))
    } catch (error) {
      console.error(error)
      response.status(500).json(postman(500))
    }
  } else {
    response.status(400).json(postman(400))
  }
}

export default handler
