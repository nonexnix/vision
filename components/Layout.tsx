import Footer from './Footer'

interface ILayout {
  children: React.ReactNode
}

const Layout = ({ children }: ILayout) => {
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr,auto]">
      {children}
      <Footer />
    </div>
  )
}

export default Layout
