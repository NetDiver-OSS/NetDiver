import { FunctionComponent } from 'react'
import { Section } from './Section'
import { Routes, Route } from 'react-router-dom'
import { RackSpace } from './RackSpace'
import { Device } from './Device'
import { Vlan } from './Vlan'
import { Usage } from './Usage'

export const NetAmApp: FunctionComponent = () => {
  return (
        <Routes>
            <Route path="/sections" element={<Section />} />
            <Route path="/usage" element={<Usage />} />
            <Route path="/rackspace" element={<RackSpace />} />
            <Route path="/devices" element={<Device />} />
            <Route path="/vlans" element={<Vlan />} />
        </Routes>
  )
}
