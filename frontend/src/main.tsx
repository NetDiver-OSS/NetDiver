import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak, { keycloakEventManager } from './keycloak.client'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReactKeycloakProvider authClient={keycloak} onEvent={keycloakEventManager}>
    <ApolloProvider client={client}>
      <MantineProvider theme={{ colorScheme: 'dark', loader: 'bars' }} withGlobalStyles withNormalizeCSS>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </MantineProvider>
    </ApolloProvider>
  </ReactKeycloakProvider>
)
