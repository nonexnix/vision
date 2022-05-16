import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { IUser } from '../library/schemas/interfaces'
import objectified from '../library/utilities/objectified'
import prisma from '../library/utilities/prisma'

interface IProps {
  initialUsers: IUser[]
}

const Authentication: NextPage<IProps> = ({ initialUsers }) => {
  return (
    <div>
      <div>Choose A User</div>
      <ul>
        {initialUsers.map((user, index) => (
          <Link href={`/connect/${user.id}`} key={user.id}>
            <li>
              <a>{`${index + 1}) ${user.firstName} ${user.lastName}`}</a>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default Authentication

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({
    include: {
      members: true,
    },
  })

  return {
    props: {
      initialUsers: objectified(users),
    },
    revalidate: 1,
  }
}
