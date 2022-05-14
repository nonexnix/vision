import { NextApiRequest, NextApiResponse } from 'next'
import postman from '../../../library/utilities/postman'
import prisma from '../../../library/utilities/prisma'

type THandler = (request: NextApiRequest, response: NextApiResponse) => void

const handler: THandler = async (request, response) => {
  if (request.method === 'DELETE') {
    const body = JSON.parse(request.body)
    try {
      await prisma.participant.delete({ where: { id: body.id } })
      response.status(200).json(postman(200))
    } catch (error) {
      console.error(error)
      response.status(500).json(postman(500))
    }
  } else {
    response.status(400).json(postman(400))
  }
}

export default handler
