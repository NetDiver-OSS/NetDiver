import React, { FunctionComponent, useState } from 'react'
import { Button, Divider, Grid, Select, Space, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useGetDnsResolutionLazyQuery } from '../../../graphql/generated'

export const DnsResolver: FunctionComponent = () => {
  const [GetDnsResolutionQuery, { data: dnsQueryData }] = useGetDnsResolutionLazyQuery()
  const [searchValue, onSearchChange] = useState('')

  const form = useForm({
    initialValues: {
      search: '',
      type: ''
    },
    validate: {
      type: (value) => (/\S+/.test(value) ? null : 'Invalid type')
    }
  })

  return (
    <>
      <h1>DNS Resolver</h1>
      <Divider my={'xs'}/>
      <Space h={'xl'}/>
      <form onSubmit={
        form.onSubmit(async (values) => {
          const result =
            await GetDnsResolutionQuery({
              variables: {
                request: values.search,
                type: values.type
              }
            })
          console.log(result)
        })}>
        <Grid>
          <Grid.Col span={8}>
            <TextInput
              label={'Search'}
              placeholder={'domain.tld'}
              {...form.getInputProps('search')}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Select
              label={'Type'}
              searchable
              clearable
              onSearchChange={onSearchChange}
              searchValue={searchValue}
              nothingFound={'Type not found'}
              dropdownComponent={'div'}
              defaultValue={'A'}
              data={[
                { value: 'A', label: 'A' },
                { value: 'AAAA', label: 'AAAA' },
                { value: 'CAA', label: 'CAA' },
                { value: 'CNAME', label: 'CNAME' },
                { value: 'MX', label: 'MX' },
                { value: 'NAPTR', label: 'NAPTR' },
                { value: 'NS', label: 'NS' },
                { value: 'PTR', label: 'PTR' },
                { value: 'SOA', label: 'SOA' },
                { value: 'SRV', label: 'SRV' },
                { value: 'TXT', label: 'TXT' }
              ]}
              {...form.getInputProps('type')}
            />
          </Grid.Col>
          <Grid.Col span={1}>
            <Button type={'submit'}>Submit</Button>
          </Grid.Col>
        </Grid>
      </form>
    </>
  )
}
