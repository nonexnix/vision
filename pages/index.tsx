import { GetServerSideProps } from 'next'
import Head from 'next/head'
import database from '../library/database'
import serializeData from '../library/helpers/serialize-data'

const Home = ({ users }: any) => {
  console.log(users)

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
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await database.user.findMany()

  return {
    props: {
      users: serializeData(users),
    },
  }
}
