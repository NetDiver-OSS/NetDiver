import { FunctionComponent } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Worker } from './worker'
import { Setting } from './setting'

export const AdminApp: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/workers" element={<Worker />} />
      <Route path="/settings" element={<Setting />} />
    </Routes>
  )
}
