'use client'

import { useEffect, useState } from 'react'

export const SOL_AUTH_HASH = '2beb6b5fe3d7bdf658da84d6ce4252d853f7d4865e025f6b3970e39a3777fd4f'

export function useAuth() {
  const [mounted, setMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const savedHash = localStorage.getItem('sol-auth')
      if (savedHash === SOL_AUTH_HASH) {
        setIsAuthenticated(true)
      }
    }
  }, [])

  return { mounted, isAuthenticated, setIsAuthenticated }
}
