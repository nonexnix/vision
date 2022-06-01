import cryptoRandomString from 'crypto-random-string'

const generateUniqueCode = (): string => {
  const one = cryptoRandomString({ length: 4, type: 'distinguishable' })
  const two = cryptoRandomString({ length: 4, type: 'distinguishable' })
  const three = cryptoRandomString({ length: 4, type: 'distinguishable' })
  const four = cryptoRandomString({ length: 4, type: 'distinguishable' })

  return `${one}-${two}-${three}-${four}`
}

export default generateUniqueCode
