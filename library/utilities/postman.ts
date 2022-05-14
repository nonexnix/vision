interface IPostman {
  code: number
  message: string
}

class Postman implements IPostman {
  code
  message

  constructor(code: number, message: string) {
    this.code = code
    this.message = message
  }
}

const postman = (code: number): IPostman => {
  switch (code) {
    case 200: {
      return new Postman(code, 'OK')
    }
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
