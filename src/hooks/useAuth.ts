import { useContext } from 'react'

import AuthContext from '@/contexts/AuthContext'

export default () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      `${AuthContext} must be used within its respective provider.`,
    )
  }

  return context
}
