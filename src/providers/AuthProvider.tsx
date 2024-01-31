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
import AuthContext, { defaultState } from '@/contexts/AuthContext'

maybeCompleteAuthSession()

const discoveryDocument: DiscoveryDocument = {
  authorizationEndpoint: `https://login.microsoftonline.com/${authConsts.azure.tenantId}/oauth2/v2.0/authorize`,
  tokenEndpoint: `https://login.microsoftonline.com/${authConsts.azure.tenantId}/oauth2/v2.0/token`,
}

export default ({ children }: { children: ReactNode }) => {
  const [request, response, loginAsync] = useAuthRequest(
    {
      clientId: authConsts.azure.clientId,
      scopes: authConsts.azure.scopes,
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
            clientId: authConsts.azure.clientId,
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
    ;(async () => {
      try {
        const [token, expiresIn, issuedAt, refreshToken] = await getAuthData()

        if (token && expiresIn && issuedAt) {
          const now = new Date().getTime() / 1000
          const threshold = authConsts.azure.refreshThreshold
          const expires = Number(issuedAt) + Number(expiresIn) - now

          setExpiresIn(expires)

          if (now < Number(issuedAt) + Number(expiresIn)) {
            if (now > Number(issuedAt) + Number(expiresIn) - threshold) {
              console.info('Refreshing ACCESS TOKEN:', token)
              console.info('with refresh token:', refreshToken)

              const tokenResponse: TokenResponse = await refreshAsync(
                {
                  clientId: authConsts.azure.clientId,
                  refreshToken: refreshToken?.toString(),
                },
                discoveryDocument,
              )

              await saveTokenData(tokenResponse)
            } else {
              console.info(
                'Access Token valid for ',
                expires / 60,
                'minute(s).',
              )
            }

            setIsAuthenticated(true)
          } else {
            console.info('Access Token EXPIRED')

            setIsAuthenticated(false)
          }
        } else {
          console.info(
            'Seems like you are not logged in. No values saved for access token.',
          )
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

const saveAuthData = async (
  token: string,
  expiresIn: number,
  issuedAt: number,
  refreshToken: string,
) => {
  setItemAsync(authConsts.storeKeys.accessToken, token)
  setItemAsync(authConsts.storeKeys.expiresIn, expiresIn.toString())
  setItemAsync(authConsts.storeKeys.issuedAt, issuedAt.toString())
  setItemAsync(authConsts.storeKeys.refreshToken, refreshToken)
}

const getAuthData = async (): Promise<
  [string | null, number, number, string | null]
> => {
  const accessToken = await getItemAsync(authConsts.storeKeys.accessToken)
  const expiresIn = await getItemAsync(authConsts.storeKeys.expiresIn)
  const issuedAt = await getItemAsync(authConsts.storeKeys.issuedAt)
  const refreshToken = await getItemAsync(authConsts.storeKeys.refreshToken)

  // await fetch('https://graph.microsoft.com/v1.0/me/', {
  //     method: 'GET',
  //     headers: {
  //         'Authorization': `Bearer ${accessToken}`,
  //     }
  // })
  //     .then(async (response) => response.json())
  //     .then((response) => {
  //         console.log(response)
  //     })
  //     .catch((error) => {
  //         console.info(error)
  //     });

  return [accessToken, Number(expiresIn), Number(issuedAt), refreshToken]
}
