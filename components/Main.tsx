interface IMain {
  children: React.ReactNode
}

const Main = ({ children }: IMain) => {
  return (
    <main>
      <div className="area">{children}</div>
    </main>
  )
}

export default Main
