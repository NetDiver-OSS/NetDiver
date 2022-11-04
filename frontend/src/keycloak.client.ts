import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
})

export const keycloakEventManager = (event: string, error?: unknown) => {
  switch (event) {
    case 'onAuthSuccess':
      break
    case 'onAuthError':
      void keycloak?.logout()
      break
    default:
      console.log('onKeycloakEvent', event, error)
      break
  }
}

export default keycloak
