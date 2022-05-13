interface IPostman {
  title: string
  code: number
  message: string
}

class Postman implements IPostman {
  title
  code
  message

  constructor(code: number, message: string) {
    this.title = 'Vision'
    this.code = code
    this.message = message
  }
}

const postman = (code: number): IPostman => {
  switch (code) {
    case 201: {
      return new Postman(code, 'Created')
    }
    case 400: {
      return new Postman(code, 'Bad Request')
    }
    case 500:
      return new Postman(code, 'Internal Server Error')
  }
  return new Postman(code, 'Invalid Code')
}

export default postman
