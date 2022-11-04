import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React, { FunctionComponent, PropsWithChildren } from 'react'
import { useKeycloak } from '@react-keycloak/web'

export const GraphQLProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { keycloak } = useKeycloak()

  const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
    headers: {
      authorization: (keycloak.token != null) ? `Bearer ${keycloak.token}` : ''
    }
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
