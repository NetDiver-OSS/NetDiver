import { AppShell, Header, Navbar } from '@mantine/core'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { NavBar } from './components/NavBar'
import { NetToolsApp } from './pages/nettools/NetToolsApp'
import { NetAmApp } from './pages/netam/NetAmApp'
import { AdminApp } from './pages/admin/AdminApp'

function App (): React.ReactElement {
  return (
    <AppShell
      padding="md"
      navbar={<NavBar />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] }
      })}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/netam/*" element={<NetAmApp />} />
        <Route path="/nettools/*" element={<NetToolsApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </AppShell>
  )
}

export default App
