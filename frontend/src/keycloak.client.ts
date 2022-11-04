import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'netdiver',
  clientId: 'frontend'
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
