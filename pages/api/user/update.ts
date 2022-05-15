import { NextApiRequest, NextApiResponse } from 'next'
import phase from '../../../library/utilities/phase'
import postman from '../../../library/utilities/postman'
import prisma from '../../../library/utilities/prisma'

type THandler = (request: NextApiRequest, response: NextApiResponse) => void

const handler: THandler = async (request, response) => {
  if (request.method === 'PUT') {
    const body = JSON.parse(request.body)
    const value = body.key === 'dueAt' ? phase(body.value, 'iso') : body.value
    try {
      await prisma.user.update({
        where: { id: body.id },
        data: { [body.key]: value },
      })
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
