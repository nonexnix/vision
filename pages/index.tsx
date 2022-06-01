import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import database from '../library/database'
import compareState from '../library/helpers/compare-state'
import serializeData from '../library/helpers/serialize-data'
import useClientStore from '../library/stores/use-client-store'

const Home = ({ users }: any) => {
  const user = useClientStore(
    ({ user }) => user,
    (previous, current) => compareState(previous, current)
  )

  // const changeUsername = useClientStore((state) => state.update.user)

  // const handleChangeName = () => {
  //   changeUsername({ key: 'username', value: 'georgeeees' })
  // }

  useEffect(() => {
    useClientStore.getState().read({ key: 'user', value: users[2] })
  }, [])

  console.log(user)

  return (
    <>
      <Head>
        <title>Vision</title>
        <meta
          name="description"
          content="Vision is a project manager for everyone to be productive"
        />
        <link rel="icon" href="/images/vision-logo-temporary.png" />
      </Head>

      <h1>Hello World</h1>
      {/* <button onClick={handleChangeName}>Change Name</button> */}
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await database.user.findMany({
    include: {
      members: {
        select: {
          project: {
            select: {
              _count: {
                select: {
                  tasks: true,
                  roles: true,
                },
              },
              id: true,
              name: true,
              description: true,
              code: true,
              over: true,
              dueAt: true,
              members: {
                select: {
                  user: {
                    select: {
                      username: true,
                      image: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  return {
    props: {
      users: serializeData(users),
    },
  }
}
