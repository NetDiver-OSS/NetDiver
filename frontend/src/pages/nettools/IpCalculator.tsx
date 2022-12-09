import React, { FunctionComponent, useEffect, useState } from 'react'
import { Accordion, Card, Divider, Grid, Group, Input, Space, Text } from '@mantine/core'
import { IconNetwork } from '@tabler/icons'
import { useGetNetRangeLazyQuery } from '../../../graphql/generated'
import { useDebounce } from '../../useDebounce'

export const IpCalculator: FunctionComponent = () => {
  const [GetNetRangeQuery, { data }] = useGetNetRangeLazyQuery()
  const [search, setSearch] = useState<string>()
  const debounceSearch = useDebounce(search, 500)

  useEffect(() => {
    void GetNetRangeQuery({
      variables: {
        network: debounceSearch
      }
    })
  }, [debounceSearch])

  return (
    <>
      <h1>IP Range Calculator</h1>
      <Divider my="xs"/>
      <Space h="xl"/>
      <Input
        icon={<IconNetwork/>}
        placeholder="IP range"
        radius="md"
        onInput={(e) => setSearch(e.target.value)}
      />
      <Space h="xl"/>
      <Space h="xl"/>

        {(data != null) && (
        <Card p={'lg'} radius={'md'} withBorder>
            <Card.Section ml={'xs'} mr={'xs'}>
                <Group mt={'md'}>
                    <IconNetwork/>
                    <Text weight={800}>{data?.getNetRange.network}</Text>
                </Group>
            </Card.Section>
            <Card.Section ml={'xs'} mr={'xs'}>
                <Group mt={'xl'} position={'apart'}>
                    <Text>Mask(CIDR)</Text>
                    <Text>{data?.getNetRange.mask} ({data?.getNetRange.bitmask})</Text>
                </Group>
                <Group mt={'md'} position={'apart'}>
                    <Text>Range</Text>
                    <Text>{data?.getNetRange.range}</Text>
                </Group>
                <Group mt={'md'} position={'apart'}>
                    <Text>Broadcast</Text>
                    <Text>{data?.getNetRange.broadcast}</Text>
                </Group>
                <Accordion ml={-17} mr={-17} p={0}>
                    <Accordion.Item value={'more'}>
                        <Accordion.Control>More informations…</Accordion.Control>
                        <Accordion.Panel>
                             <Grid columns={6} ml={'xs'}>
                               <Grid.Col span={4}>Addresses</Grid.Col>
                               <Grid.Col span={2} ta={'right'}>{data?.getNetRange.size}</Grid.Col>
                               <Grid.Col span={4}>First addressable host</Grid.Col>
                               <Grid.Col span={2} ta={'right'}>{data?.getNetRange.first}</Grid.Col>
                               <Grid.Col span={4}>Last addressable host</Grid.Col>
                               <Grid.Col span={2} ta={'right'}>{data?.getNetRange.last}</Grid.Col>
                             </Grid>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </Card.Section>
        </Card>
        )}
    </>
  )
}
