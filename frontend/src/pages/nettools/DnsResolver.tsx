import React, { FunctionComponent, PropsWithChildren, useState } from 'react'
import { Button, Card, Divider, Grid, Group, List, Select, Space, Text, TextInput, ThemeIcon } from '@mantine/core'
import { useForm } from '@mantine/form'
import { NetDnsResolver, useGetDnsResolutionLazyQuery } from '../../../graphql/generated'
import { IconNeedle, IconSearch } from '@tabler/icons'

const DnsArrayStringComp: FunctionComponent<{data: string[]}> = ({ data }) => {
  console.log(data)
  return <>
    <List
    icon={
      <ThemeIcon color="gray">
        <IconNeedle/>
      </ThemeIcon>
    }>
    { data.map((entry, index) => (
      <List.Item>{entry}</List.Item>
    )) }
    </List>
  </>
}
const DnsResultArrayComp: FunctionComponent<PropsWithChildren<{query: string[], data: string[]}>> = ({ query, data, children }) => {
  return <Card p={'lg'} radius={'md'} withBorder>
    <Card.Section ml={'xs'} mr={'xs'} mt={'xs'} mb={'xs'}>
      <Group mt={'md'}>
        <IconSearch/>
        <Text>Type</Text>
        <Text weight={800}>{query.type}</Text>
        <Text>for hostname</Text>
        <Text weight={800}>{query.search}</Text>
      </Group>
    </Card.Section>
    <Card.Section ml={'xs'} mr={'xs'} mt={'xs'} mb={'xs'}>
      <Text weight={800}>Result :</Text>
      {children}
    </Card.Section>
  </Card>
}

export const DnsResolver: FunctionComponent = () => {
  const [GetDnsResolutionQuery, { data: dnsQueryData }] = useGetDnsResolutionLazyQuery()
  const [searchValue, onSearchChange] = useState('')
  const [query, setQueryChange] = useState<NetDnsResolver>()

  const form = useForm({
    initialValues: {
      search: '',
      type: ''
    },
    validate: {
      type: (value) => (/\S+/.test(value) ? null : 'Invalid type')
    }
  })
  type FormValues = typeof form.values
  const handleSubmit: FormValues = form.values

  const toto = async (values): Promise<void> => {
    const result = await GetDnsResolutionQuery({
      variables: {
        request: values.search,
        type: values.type
      }
    })
    setQueryChange(result.data?.getDnsResolution)
  }

  return (
    <>
      <h1>DNS Resolver</h1>
      <Divider my={'xs'}/>
      <Space h={'xl'}/>
      <form onSubmit={form.onSubmit(async values => await toto(values))}>
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
      {(query != undefined) && (
        <DnsResultArrayComp query={handleSubmit} data={query}>
          <DnsArrayStringComp data={query?.a}/>
        </DnsResultArrayComp>
      )}
    </>
  )
}
