export default {
  azure: {
    clientId: '***REMOVED***',
    tenantId: '***REMOVED***',
    redirectScheme: 'helium',
    redirectPath: 'auth',
    refreshThreshold: 60,
    scopes: ['openid', 'offline_access', 'profile', 'email', 'User.Read'],
  },
  storeKeys: {
    firstName: 'FIRST_NAME',
    email: 'EMAIL',
    accessToken: 'ACCESS_TOKEN',
    refreshToken: 'REFRESH_TOKEN',
    expiresIn: 'EXPIRES_IN',
    issuedAt: 'ISSUED_AT',
  },
}
