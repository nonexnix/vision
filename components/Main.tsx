interface IProps {
  children: React.ReactNode
}

const Main = ({ children }: IProps) => {
  return (
    <main>
      <div className="area">{children}</div>
    </main>
  )
}

export default Main
