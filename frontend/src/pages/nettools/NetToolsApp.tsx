import React, { FunctionComponent } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MacAddress } from './MacAddress'
import { IpCalculator } from './IpCalculator'
import { DnsResolver } from './DnsResolver'

export const NetToolsApp: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/macaddress" element={<MacAddress />} />
      <Route path="/ipcalculator" element={<IpCalculator />} />
      <Route path="/dnsresolver" element={<DnsResolver />} />
    </Routes>
  )
}
