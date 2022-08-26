import React, { FunctionComponent } from 'react'
import { useGetMacAddressesAndVendorsQuery } from '../../../graphql/generated'
import { Table } from '@mantine/core'

export const MacAddress: FunctionComponent = () => {
  const { data, loading, error } = useGetMacAddressesAndVendorsQuery()

  return (
    <>
      <h1>MacAddress Finder</h1>

      {(data != null) && (
        <Table>
          <thead>
          <tr>
            <th>MAC</th>
            <th>Vendeur</th>
          </tr>
          </thead>
          <tbody>{data.getMacAddressesAndVendors.map((element) => (
            <tr key={element.id}>
              <td>{element.mac}</td>
              <td>{element.vendor}</td>
            </tr>
          ))}</tbody>
        </Table>

      )}
    </>
  )
}
