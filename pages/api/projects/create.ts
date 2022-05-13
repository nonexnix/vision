import { NextApiRequest, NextApiResponse } from 'next'
import phase from '../../../library/utilities/phase'
import postman from '../../../library/utilities/postman'
import prisma from '../../../library/utilities/prisma'
import unicode from '../../../library/utilities/unicode'

type THandler = (request: NextApiRequest, response: NextApiResponse) => void

const handler: THandler = async (request, response) => {
  if (request.method === 'POST') {
    const body = JSON.parse(request.body)
    try {
      const project = await prisma.project.create({
        data: {
          name: body.name,
          description: body.description,
          code: unicode(),
          dueAt: phase(body.dueAt, 'iso'),
          userId: body.userId,
          members: {
            create: {
              userId: body.userId,
            },
          },
          roles: {
            create: {
              name: 'Leader',
              description:
                'A project leader is a professional who leads people and makes sure a project is carried through.',
              default: true,
              permission: {
                create: {
                  everything: true,
                },
              },
            },
          },
        },
        include: {
          members: { select: { id: true } },
          roles: { select: { id: true } },
        },
      })

      await prisma.authorization.create({
        data: {
          memberId: project.members[0].id,
          roleId: project.roles[0].id,
        },
      })

      await prisma.role.create({
        data: {
          name: 'Member',
          description:
            'A Project member are the individual who actively work on one or more phases of the project.',
          default: true,
          projectId: project.id,
          permission: {
            create: {
              everything: true,
            },
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
