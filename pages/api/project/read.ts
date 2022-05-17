import { NextApiRequest, NextApiResponse } from 'next'
import postman from '../../../library/utilities/postman'
import prisma from '../../../library/utilities/prisma'

type THandler = (request: NextApiRequest, response: NextApiResponse) => void

const handler: THandler = async (request, response) => {
  if (request.method === 'POST') {
    const body = JSON.parse(request.body)
    try {
      const project = await prisma.project.findUnique({
        where: { id: body.id },
        include: {
          members: true,
          tasks: true,
          suggestions: true,
          files: true,
          announcements: true,
        },
      })
      response.status(200).json(project)
    } catch (error) {
      console.error(error)
      response.status(500).json(postman(500))
    }
  } else {
    response.status(400).json(postman(400))
  }
}

export default handler
