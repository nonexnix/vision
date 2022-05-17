interface IProps {
  children: React.ReactNode
}

const Modal = ({ children }: IProps) => {
  return <div>{children}</div>
}

export default Modal
