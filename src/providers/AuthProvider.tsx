import { ReactNode, useEffect, useState } from 'react'

import {
  AccessTokenRequest,
  DiscoveryDocument,
  ResponseType,
  TokenResponse,
  exchangeCodeAsync,
  makeRedirectUri,
  refreshAsync,
  useAuthRequest,
} from 'expo-auth-session'
import { getItemAsync, setItemAsync } from 'expo-secure-store'
import { maybeCompleteAuthSession } from 'expo-web-browser'

import authConsts from '@/constants/auth'
import AuthContext, { User, defaultState } from '@/contexts/AuthContext'

maybeCompleteAuthSession()

const discoveryDocument: DiscoveryDocument = {
  authorizationEndpoint: `https://login.microsoftonline.com/${process.env.EXPO_PUBLIC_TENANT_ID ?? ''}/oauth2/v2.0/authorize`,
  tokenEndpoint: `https://login.microsoftonline.com/${process.env.EXPO_PUBLIC_TENANT_ID ?? ''}/oauth2/v2.0/token`,
}

export default ({ children }: { children: ReactNode }) => {
  const [request, response, loginAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_CLIENT_ID ?? '',
      scopes: authConsts.azure.scopes ?? '',
      responseType: ResponseType.Code,
      redirectUri: makeRedirectUri({
        scheme: authConsts.azure.redirectScheme,
        path: authConsts.azure.redirectPath,
      }),
    },
    discoveryDocument,
  )

  const [isAuthenticated, setIsAuthenticated] = useState(
    defaultState.isAuthenticated,
  )

  const [expiresIn, setExpiresIn] = useState(defaultState.expiresIn)

  const [user, setUser] = useState<User>()

  const logoutAsync = async () => {
    await saveAuthData('', Number(null), Number(null), '')
    setExpiresIn(0)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    if (request && response && response.type == 'success') {
      try {
        (async () => {
          const accessTokenRequest = new AccessTokenRequest({
            code: response.params.code as string,
            clientId: process.env.EXPO_PUBLIC_CLIENT_ID ?? '',
            scopes: authConsts.azure.scopes,
            extraParams: {
              code_verifier: request.codeVerifier || '',
            },
            redirectUri: makeRedirectUri({
              scheme: authConsts.azure.redirectScheme,
              path: authConsts.azure.redirectPath,
            }),
          })

          const tokenResponse = await exchangeCodeAsync(
            accessTokenRequest,
            discoveryDocument,
          )

          await saveTokenData(tokenResponse)
        })()

        setIsAuthenticated(true)
      } catch (error) {
        console.info(error)

        setIsAuthenticated(false)
      }
    } else if (response?.type == 'error') {
      console.info(response?.error)

      setIsAuthenticated(false)
    }
  }, [request, response])

  useEffect(() => {
    (async () => {
      try {
        const [token, expiresIn, issuedAt, refreshToken, user] =
          await getAuthData()

        if (token && expiresIn && issuedAt) {
          const now = new Date().getTime() / 1000
          const threshold = authConsts.azure.refreshThreshold
          const expires = Number(issuedAt) + Number(expiresIn) - now

          setExpiresIn(expires)

          if (now < Number(issuedAt) + Number(expiresIn)) {
            if (now > Number(issuedAt) + Number(expiresIn) - threshold) {
              const tokenResponse: TokenResponse = await refreshAsync(
                {
                  clientId: process.env.EXPO_PUBLIC_CLIENT_ID ?? '',
                  refreshToken: refreshToken?.toString(),
                },
                discoveryDocument,
              )

              await saveTokenData(tokenResponse)
            }

            setIsAuthenticated(true)
            setUser(user)
          } else {
            setIsAuthenticated(false)
          }
        }
      } catch (error) {
        console.warn(error)
      }
    })()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        expiresIn,
        request,
        response,
        user,
        loginAsync,
        logoutAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const saveTokenData = async (tokenResponse: TokenResponse) => {
  const accessToken = tokenResponse.accessToken
  const expiresIn = tokenResponse.expiresIn
  const issuedAt = tokenResponse.issuedAt
  const refreshToken = tokenResponse.refreshToken

  if (accessToken && expiresIn && issuedAt && refreshToken) {
    await saveAuthData(accessToken, expiresIn, issuedAt, refreshToken)
  } else {
    throw new Error(
      'After Code Exchange there is no accessToken, expiresIn or issuedAt values to be stored.',
    )
  }
}

const getUserData = async (accessToken: string) => {
  const user: User = {
    email: '',
    firstName: '',
  }

  await fetch('https://graph.microsoft.com/v1.0/me/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(async (response) => response.json())
    .then((response) => {
      user.email = response?.mail ?? ''
      user.firstName = response?.givenName ?? ''
    })
    .catch((error) => {
      console.info(error)
    })

  return user
}

const saveAuthData = async (
  accessToken: string,
  expiresIn: number,
  issuedAt: number,
  refreshToken: string,
) => {
  setItemAsync(authConsts.storeKeys.accessToken, accessToken)
  setItemAsync(authConsts.storeKeys.expiresIn, expiresIn.toString())
  setItemAsync(authConsts.storeKeys.issuedAt, issuedAt.toString())
  setItemAsync(authConsts.storeKeys.refreshToken, refreshToken)

  const user = await getUserData(accessToken)

  setItemAsync(authConsts.storeKeys.email, user.email)
  setItemAsync(authConsts.storeKeys.firstName, user.firstName)
}

const getAuthData = async (): Promise<
  [string | null, number, number, string | null, User]
> => {
  const accessToken = await getItemAsync(authConsts.storeKeys.accessToken)
  const expiresIn = await getItemAsync(authConsts.storeKeys.expiresIn)
  const issuedAt = await getItemAsync(authConsts.storeKeys.issuedAt)
  const refreshToken = await getItemAsync(authConsts.storeKeys.refreshToken)

  let user: User = {
    email: (await getItemAsync(authConsts.storeKeys.email)) ?? '',
    firstName: (await getItemAsync(authConsts.storeKeys.firstName)) ?? '',
  }

  if (user.email == '' || user.firstName == '') {
    user = await getUserData(accessToken ?? '')
  }

  return [accessToken, Number(expiresIn), Number(issuedAt), refreshToken, user]
}
