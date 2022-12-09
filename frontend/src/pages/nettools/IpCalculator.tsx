import React, { FunctionComponent, useEffect, useState } from 'react'
import { Accordion, Card, Divider, Grid, Group, Input, Space, Text } from '@mantine/core'
import { IconNetwork } from '@tabler/icons'
import {
  NetCalculator,
  useGetNetNextRangeLazyQuery,
  useGetNetPreviousRangeLazyQuery,
  useGetNetRangeLazyQuery
} from '../../../graphql/generated'
import { useDebounce } from '../../useDebounce'

const NetRangeInfoCard: FunctionComponent<{range: NetCalculator}> = ({ range }) => {
  return <Card p={'lg'} radius={'md'} withBorder>
    <Card.Section ml={'xs'} mr={'xs'}>
      <Group mt={'md'}>
        <IconNetwork/>
        <Text weight={800}>{range.network}</Text>
      </Group>
    </Card.Section>
    <Card.Section ml={'xs'} mr={'xs'}>
      <Group mt={'xl'} position={'apart'}>
        <Text>Mask(CIDR)</Text>
        <Text>{range.mask} ({range.bitmask})</Text>
      </Group>
      <Group mt={'md'} position={'apart'}>
        <Text>Range</Text>
        <Text>{range.range}</Text>
      </Group>
      <Group mt={'md'} position={'apart'}>
        <Text>Broadcast</Text>
        <Text>{range.broadcast}</Text>
      </Group>
      <Accordion ml={-17} mr={-17} p={0}>
        <Accordion.Item value={'more'}>
          <Accordion.Control>More informations…</Accordion.Control>
          <Accordion.Panel>
            <Grid columns={6} ml={'xs'}>
              <Grid.Col span={4}>Addresses</Grid.Col>
              <Grid.Col span={2} ta={'right'}>{range.size}</Grid.Col>
              <Grid.Col span={4}>First addressable host</Grid.Col>
              <Grid.Col span={2} ta={'right'}>{range.first}</Grid.Col>
              <Grid.Col span={4}>Last addressable host</Grid.Col>
              <Grid.Col span={2} ta={'right'}>{range.last}</Grid.Col>
            </Grid>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Card.Section>
  </Card>
}

export const IpCalculator: FunctionComponent = () => {
  const [GetNetRangeQuery, { data: netRange }] = useGetNetRangeLazyQuery()
  const [GetNetPreviousRangeQuery, { data: netPrevRange }] = useGetNetPreviousRangeLazyQuery()
  const [GetNetNextRangeQuery, { data: netNextRange }] = useGetNetNextRangeLazyQuery()
  const [search, setSearch] = useState<string>()
  const debounceSearch = useDebounce(search, 500)

  useEffect(() => {
    void GetNetRangeQuery({
      variables: {
        network: debounceSearch
      }
    })
    void GetNetPreviousRangeQuery({
      variables: {
        network: debounceSearch
      }
    })
    void GetNetNextRangeQuery({
      variables: {
        network: debounceSearch
      }
    })
  }, [debounceSearch])

  return (
    <>
      <h1>IP Range Calculator</h1>
      <Divider my="xs"/>
      <Space h="md"/>
      <Input
        icon={<IconNetwork/>}
        placeholder="IP range"
        radius="md"
        onInput={(e) => setSearch(e.target.value)}
      />
      <Space h="xl"/>

      {(netRange != null) && (
        <NetRangeInfoCard range={netRange?.getNetRange}/>
      )}
      <Grid grow columns={2} mt={'md'}>
        {(netPrevRange != null) && (
          <Grid.Col span={1}>
            <NetRangeInfoCard range={netPrevRange?.getNetRangePrevious}/>
          </Grid.Col>
        )}
        {(netNextRange != null) && (
          <Grid.Col span={1}>
            <NetRangeInfoCard range={netNextRange?.getNetRangeNext}/>
          </Grid.Col>
        )}
      </Grid>
    </>
  )
}
