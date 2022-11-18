import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router-dom'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak, { keycloakEventManager } from './keycloak.client'
import { GraphQLProvider } from './provider/GraphQLProvider'

Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
})

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
