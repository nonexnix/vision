import Head from 'next/head'

interface IProps {
  children: React.ReactNode
  title: string
}

const Foundation = ({ children, title }: IProps) => {
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

export default Foundation
