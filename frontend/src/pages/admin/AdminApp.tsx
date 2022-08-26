import React, { FunctionComponent } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Worker } from './Worker'
import { Setting } from './Setting'

export const AdminApp: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/workers" element={<Worker />} />
      <Route path="/settings" element={<Setting />} />
    </Routes>
  )
}
