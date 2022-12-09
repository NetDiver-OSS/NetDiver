import { AppShell, Container, LoadingOverlay } from '@mantine/core'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { NavBar } from './components/NavBar'
import { NetToolsApp } from './pages/nettools/NetToolsApp'
import { NetAmApp } from './pages/netam/NetAmApp'
import { AdminApp } from './pages/admin/AdminApp'
import { useKeycloak } from '@react-keycloak/web'
import { LoginPage } from './pages/LoginPage'
import { registerSentry } from './sentry.client'

function App (): React.ReactElement {
  const { initialized, keycloak } = useKeycloak()

  if (!initialized) {
    return <LoadingOverlay visible={true} overlayBlur={2} />
  }

  useEffect(() => {
    registerSentry()
  }, [])

  return (
    <AppShell
      padding="md"
      navbar={<NavBar />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] }
      })}
    >
      <Container size="lg">
      <Routes>
        {
          keycloak?.authenticated === true
            ? <>
                <Route index element={<HomePage />} />
                <Route path="/netam/*" element={<NetAmApp />} />
                <Route path="/nettools/*" element={<NetToolsApp />} />
                <Route path="/admin/*" element={<AdminApp />} />
            </>
            : <Route path="*" element={<LoginPage />} />
        }
      </Routes>
      </Container>
    </AppShell>
  )
}

export default App
