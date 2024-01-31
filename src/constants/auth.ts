export default {
  azure: {
    clientId: '9d98859d-ee1b-4a42-8218-2933455590db',
    tenantId: 'b8710300-e17a-4f12-92c5-869695e07115',
    redirectScheme: 'helium',
    redirectPath: 'auth',
    refreshThreshold: 60,
    scopes: ['openid', 'offline_access', 'profile', 'email'],
  },
  storeKeys: {
    accessToken: 'ACCESS_TOKEN',
    refreshToken: 'REFRESH_TOKEN',
    expiresIn: 'EXPIRES_IN',
    issuedAt: 'ISSUED_AT',
  },
}
