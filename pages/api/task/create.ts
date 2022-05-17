import { NextApiRequest, NextApiResponse } from 'next'
import phase from '../../../library/utilities/phase'
import postman from '../../../library/utilities/postman'
import prisma from '../../../library/utilities/prisma'

type THandler = (request: NextApiRequest, response: NextApiResponse) => void

const handler: THandler = async (request, response) => {
  if (request.method === 'POST') {
    const body = JSON.parse(request.body)
    try {
      await prisma.task.create({
        data: {
          name: body.name,
          description: body.description,
          priority: body.priority,
          dueAt: phase(body.dueAt, 'iso'),
          memberId: body.memberId,
          projectId: body.projectId,
          participants: { createMany: { data: body.participants ? [...body.participants] : [] } },
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
