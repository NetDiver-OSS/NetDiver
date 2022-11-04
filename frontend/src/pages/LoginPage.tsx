import React, { FunctionComponent } from 'react'
import { useKeycloak } from '@react-keycloak/web'

export const LoginPage: FunctionComponent = () => {
  const { keycloak } = useKeycloak()

  void keycloak.login()

  return null
}
