interface IProps {
  children: React.ReactNode
}

const LayoutMain = ({ children }: IProps) => {
  return (
    <main>
      <div className="area">{children}</div>
    </main>
  )
}

export default LayoutMain
