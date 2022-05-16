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
import unicode from '../../../library/utilities/unicode'

interface IProps {
  initialUser: IUser
}

const Test = () => {
  const user = useClientStore<IUser>((state) => state.user)
  const createProject = useClientStore((state) => state.create.project)

  const handleCreateProject = () => {
    createProject({
      name: `Project ${unicode()}`,
      description: 'Project description',
      dueAt: 'September 22, 2022',
      userId: user.id,
    })
  }

  return (
    <div className="space-y-5">
      <button className="px-3 py-2 bg-orange-500 text-white rounded" onClick={handleCreateProject}>
        Add Project
      </button>
      <div className="space-y-5">
        {user.members?.map((member) => (
          <div className="px-3 py-2 bg-pink-500 text-white rounded" key={member.id}>
            {member.project!.name}
          </div>
        ))}
      </div>
    </div>
  )
}

const Home: NextPage<IProps> = ({ initialUser }) => {
  const user = useClientStore<IUser>((state) => state.user)

  useEffect(() => {
    useClientStore.getState().read.user(initialUser)
  }, [initialUser])

  if (!user.id) return <></>

  console.log(user)

  return (
    <Page title={`Home | @${user.username}`}>
      <Layout>
        <Header />
        <Main>
          <section>Home Page</section>
          <Test />
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
