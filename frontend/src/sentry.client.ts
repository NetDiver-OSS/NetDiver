import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

export const registerSentry = (): void => {
/*  if (!import.meta.env.PROD) {
    return
  } */

  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0
  })
}
