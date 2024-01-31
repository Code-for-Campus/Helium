import { createContext } from 'react'

import { AuthRequest, AuthSessionResult } from 'expo-auth-session'

interface AuthContext {
  isAuthenticated: boolean
  expiresIn: number
  request: AuthRequest | null
  response: AuthSessionResult | null
  loginAsync?: () => Promise<AuthSessionResult>
  logoutAsync?: () => Promise<void>
}

export const defaultState: AuthContext = {
  isAuthenticated: false,
  expiresIn: 0,
  request: null,
  response: null,
}

export default createContext<AuthContext>(defaultState)
