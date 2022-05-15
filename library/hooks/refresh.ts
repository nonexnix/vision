import { useCallback } from 'react'
import { useRouter } from 'next/router'

const useRefresh = () => {
  const { asPath, replace } = useRouter()

  return useCallback(() => replace(asPath), [asPath])
}

export default useRefresh
