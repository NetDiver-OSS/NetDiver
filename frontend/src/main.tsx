import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak, { keycloakEventManager } from './keycloak.client'
import { GraphQLProvider } from './provider/GraphQLProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReactKeycloakProvider authClient={keycloak} onEvent={keycloakEventManager}>
    <GraphQLProvider>
      <MantineProvider theme={{ colorScheme: 'dark', loader: 'bars' }} withGlobalStyles withNormalizeCSS>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </MantineProvider>
    </GraphQLProvider>
  </ReactKeycloakProvider>
)
