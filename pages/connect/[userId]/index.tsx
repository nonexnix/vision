import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { useEffect } from 'react'
import Header from '../../../components/Header'
import Layout from '../../../components/Layout'
import Main from '../../../components/Main'
import Page from '../../../components/Page'
import type { IUser } from '../../../library/schemas/interfaces'
import useClientStore from '../../../library/stores/client'
import objectified from '../../../library/utilities/objectified'
import prisma from '../../../library/utilities/prisma'
import { useRouter } from 'next/router'

interface IProps {
  initialUser: IUser
}

const refresh = (router: any) => {
  return router.replace(router.asPath)
}


const Home: NextPage<IProps> = ({ initialUser }) => {
  const user = useClientStore<IUser>((state) => state.user)
  const create = useClientStore((state) => state.create.project)
  const router = useRouter()
 
  const hander = () => {
    create({
      userId: user.id,
      name: 'Project x',
      description: 'Project',
      dueAt: 'September 22, 2022',
    })
    refresh(router)
  }

  useEffect(() => {
    useClientStore.getState().read.user(initialUser)
  }, [initialUser])

  if (!user.id || user !== initialUser) return <></>

  console.log(user)

  return (
    <Page title={`Home | @${user.username}`}>
      <Layout>
        <Header />
        <Main>
          <section onClick={hander}>Home Page</section>
          {user.members?.map((member) => (
            <div key={member.id}>{member.project?.name}</div>
          ))}
        </Main>
      </Layout>
    </Page>
  )
}

export default Home

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany()

  const paths = users.map((user) => {
    return {
      params: { userId: user.id },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: { id: String(params!.userId) },
    include: {
      members: {
        include: {
          _count: { select: { tasks: true } },
          project: {
            include: {
              _count: { select: { members: true, tasks: true } },
            },
          },
        },
      },
    },
  })

  return {
    props: {
      initialUser: objectified(user),
    },
    revalidate: 1,
  }
}
