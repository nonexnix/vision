import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Suspense } from 'react'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Component {...pageProps} />
    </Suspense>
  )
}

export default App
