import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import Chatbox from '../../../../../components/chatbox'
import Footer from '../../../../../components/footer'
import Header from '../../../../../components/header'
import Layout from '../../../../../components/layout'
import Main from '../../../../../components/main'
import type { IMember, IMessage, IProject, IUser } from '../../../../../library/schemas/interfaces'
import useClientStore from '../../../../../library/stores/client'
import objectified from '../../../../../library/utilities/objectified'
import prisma from '../../../../../library/utilities/prisma'
import Foundation from '../../../../../components/foundation'

interface IProps {
  initialUser: IUser
  initialMember: IMember
  initialProject: IProject
  initialMessages: IMessage[]
}

const Dashboard: NextPage<IProps> = ({ initialUser, initialMember, initialProject, initialMessages }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
    useClientStore.getState().read.user(initialUser)
    useClientStore.getState().read.member(initialMember)
    useClientStore.getState().read.project(initialProject)
    useClientStore.getState().read.messages(initialMessages)
  }, [initialUser, initialMember, initialProject, initialMessages])

  if (!ready) return <></>

  console.log('Dashoard Rendered')

  return (
    <Foundation title="Dashboard">
      <Layout>
        <Header />
        <Main>
          <section>Dashboard Page</section>
        </Main>
        <Footer />
        <Chatbox />
      </Layout>
    </Foundation>
  )
}

export default Dashboard

export const getStaticPaths: GetStaticPaths = async () => {
  const members = await prisma.member.findMany()

  const paths = members.map((member) => {
    return {
      params: { userId: member.userId, memberId: member.id },
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

  const member = await prisma.member.findUnique({
    where: { id: String(params!.memberId) },
  })

  const project = await prisma.project.findUnique({
    where: { id: member?.projectId },
    include: {
      members: true,
      tasks: true,
      suggestions: true,
      files: true,
      announcements: true,
    },
  })

  const messages = await prisma.message.findMany({
    where: { projectId: member!.projectId },
  })

  return {
    props: {
      initialUser: objectified(user),
      initialMember: objectified(member),
      initialProject: objectified(project),
      initialMessages: objectified(messages),
    },
    revalidate: 1,
  }
}
