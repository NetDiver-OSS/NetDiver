import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import {
  MacAddress as MacAddressGraphQL,
  useGetMacAddressLazyQuery, useGetVendorLazyQuery
} from '../../../graphql/generated'
import { Table, Input, Space, Divider } from '@mantine/core'
import { IconAt } from '@tabler/icons'
import { useDebounce } from '../../useDebounce'

export const MacAddress: FunctionComponent = () => {
  const [GetMacAddressQuery, { data: macAddressData }] = useGetMacAddressLazyQuery()
  const [GetVendorQuery, { data: vendorData }] = useGetVendorLazyQuery()
  const [search, setSearch] = useState<string>('')
  const debounceSearch = useDebounce(search, 500)

  useEffect(() => {
    void GetMacAddressQuery({
      variables: {
        macPrefix: debounceSearch
      }
    })
    void GetVendorQuery({
      variables: {
        vendor: debounceSearch
      }
    })
  }, [debounceSearch])

  const data = useMemo(() => {
    const macAddress: MacAddressGraphQL[] = []

    const macAddressQuery = macAddressData?.getMacAddress ?? []
    const vendorQuery = vendorData?.getVendor ?? []

    macAddressQuery.forEach((element: MacAddressGraphQL) => {
      if (macAddress.find(e => e.mac === element.mac) == null) {
        macAddress.push(element)
      }
    })

    vendorQuery.forEach((element: MacAddressGraphQL) => {
      if (macAddress.find(e => e.mac === element.mac) == null) {
        macAddress.push(element)
      }
    })

    return macAddress
  }, [macAddressData, vendorData])

  return (
    <>
      <h1>MacAddress Finder</h1>
      <Divider my="xs"/>
      <Space h="xl"/>
      <Input
        icon={<IconAt/>}
        placeholder="FF-FF-FF or Vendor"
        radius="md"
        onInput={(e) => setSearch(e.target.value)}
      />
      <Space h="xl"/>
      <Space h="xl"/>

      {(data != null) && (
        <Table verticalSpacing="xs">
          <thead>
          <tr>
            <th width="30%">MAC</th>
            <th width="70%">Vendeur</th>
          </tr>
          </thead>
          <tbody>{data.map((element) => (
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
