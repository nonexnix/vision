import { GetServerSideProps, NextPage } from 'next'
import objectified from '../library/utilities/objectified'
import prisma from '../library/utilities/prisma'

const Sandbox: NextPage<any> = ({ initialUsers }) => {
  console.log(initialUsers)
  return <div>Sandbox</div>
}

export default Sandbox

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany()

  return {
    props: {
      initialUsers: objectified(users),
    },
  }
}
