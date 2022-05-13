import cryptoRandomString from 'crypto-random-string';

const unicode = () => {
  const first = cryptoRandomString({length: 4, type: 'distinguishable'})
  const last = cryptoRandomString({length: 4, type: 'distinguishable'})
  
  return `${first}-${last}`
}

export default unicode