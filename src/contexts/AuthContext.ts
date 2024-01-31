import { createContext } from 'react'

import { AuthRequest, AuthSessionResult } from 'expo-auth-session'

export interface User {
  email: string
  firstName: string
}

interface AuthContext {
  isAuthenticated: boolean
  expiresIn: number
  request: AuthRequest | null
  response: AuthSessionResult | null
  user?: User
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
