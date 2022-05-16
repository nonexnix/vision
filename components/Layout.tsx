import Footer from './Footer'

interface IProps {
  children: React.ReactNode
}

const Layout = ({ children }: IProps) => {
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr,auto]">
      {children}
      <Footer />
    </div>
  )
}

export default Layout
