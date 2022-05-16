import Head from 'next/head'

interface IPage {
  children: React.ReactNode
  title: string
}

const Page = ({ children, title }: IPage) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Vision is a project manager for everyone to be productive" />
        <link rel="icon" href="/images/vision-logo-temporary.png" />
      </Head> 
      {children}
    </>
  )
}

export default Page
