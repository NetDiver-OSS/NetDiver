import React, { FunctionComponent, useEffect, useState } from 'react'
import { Accordion, Card, Divider, Grid, Group, Input, Space, Text } from '@mantine/core'
import { IconNetwork } from '@tabler/icons'
import {
  useGetNetNextRangeLazyQuery,
  useGetNetPreviousRangeLazyQuery,
  useGetNetRangeLazyQuery
} from '../../../graphql/generated'
import { useDebounce } from '../../useDebounce'

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
        <Card p={'lg'} radius={'md'} withBorder>
          <Card.Section ml={'xs'} mr={'xs'}>
            <Group mt={'md'}>
              <IconNetwork/>
              <Text weight={800}>{netRange?.getNetRange.network}</Text>
            </Group>ꞩ
          </Card.Section>
          <Card.Section ml={'xs'} mr={'xs'}>
            <Group mt={'xl'} position={'apart'}>
              <Text>Mask(CIDR)</Text>
              <Text>{netRange?.getNetRange.mask} ({netRange?.getNetRange.bitmask})</Text>
            </Group>
            <Group mt={'md'} position={'apart'}>
              <Text>Range</Text>
              <Text>{netRange?.getNetRange.range}</Text>
            </Group>
            <Group mt={'md'} position={'apart'}>
              <Text>Broadcast</Text>
              <Text>{netRange?.getNetRange.broadcast}</Text>
            </Group>
            <Accordion ml={-17} mr={-17} p={0}>
              <Accordion.Item value={'more'}>
                <Accordion.Control>More informations…</Accordion.Control>
                <Accordion.Panel>
                  <Grid columns={6} ml={'xs'}>
                    <Grid.Col span={4}>Addresses</Grid.Col>
                    <Grid.Col span={2} ta={'right'}>{netRange?.getNetRange.size}</Grid.Col>
                    <Grid.Col span={4}>First addressable host</Grid.Col>
                    <Grid.Col span={2} ta={'right'}>{netRange?.getNetRange.first}</Grid.Col>
                    <Grid.Col span={4}>Last addressable host</Grid.Col>
                    <Grid.Col span={2} ta={'right'}>{netRange?.getNetRange.last}</Grid.Col>
                  </Grid>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Card.Section>
        </Card>
      )}
      <Grid grow columns={2} mt={'md'}>
        {(netPrevRange != null) && (
          <Grid.Col span={1}>
            <Card p={'lg'} radius={'md'} withBorder>
              <Card.Section ml={'xs'} mr={'xs'}>
                <Group mt={'md'}>
                  <IconNetwork/>
                  <Text weight={800}>Previous range</Text>
                  <Text weight={800}>{netPrevRange?.getNetRangePrevious.network}</Text>
                </Group>
              </Card.Section>
              <Card.Section ml={'xs'} mr={'xs'}>
                <Group mt={'xl'} position={'apart'}>
                  <Text>Mask(CIDR)</Text>
                  <Text>{netPrevRange?.getNetRangePrevious.mask} ({netPrevRange?.getNetRangePrevious.bitmask})</Text>
                </Group>
                <Group mt={'md'} position={'apart'}>
                  <Text>Range</Text>
                  <Text>{netPrevRange?.getNetRangePrevious.range}</Text>
                </Group>
                <Group mt={'md'} position={'apart'}>
                  <Text>Broadcast</Text>
                  <Text>{netPrevRange?.getNetRangePrevious.broadcast}</Text>
                </Group>
                <Accordion ml={-17} mr={-17} p={0}>
                  <Accordion.Item value={'more'}>
                    <Accordion.Control>More informations…</Accordion.Control>
                    <Accordion.Panel>
                      <Grid columns={6} ml={'xs'}>
                        <Grid.Col span={4}>Addresses</Grid.Col>
                        <Grid.Col span={2}
                                  ta={'right'}>{netPrevRange?.getNetRangePrevious.size}</Grid.Col>
                        <Grid.Col span={4}>First addressable host</Grid.Col>
                        <Grid.Col span={2}
                                  ta={'right'}>{netPrevRange?.getNetRangePrevious.first}</Grid.Col>
                        <Grid.Col span={4}>Last addressable host</Grid.Col>
                        <Grid.Col span={2}
                                  ta={'right'}>{netPrevRange?.getNetRangePrevious.last}</Grid.Col>
                      </Grid>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Card.Section>
            </Card>
          </Grid.Col>
        )}
        {(netNextRange != null) && (
          <Grid.Col span={1}>
            <Card p={'lg'} radius={'md'} withBorder>
              <Card.Section ml={'xs'} mr={'xs'}>
                <Group mt={'md'}>
                  <IconNetwork/>
                  <Text weight={800}>Next range</Text>
                  <Text weight={800}>{netNextRange?.getNetRangeNext.network}</Text>
                </Group>
              </Card.Section>
              <Card.Section ml={'xs'} mr={'xs'}>
                <Group mt={'xl'} position={'apart'}>
                  <Text>Mask(CIDR)</Text>
                  <Text>{netNextRange?.getNetRangeNext.mask} ({netNextRange?.getNetRangeNext.bitmask})</Text>
                </Group>
                <Group mt={'md'} position={'apart'}>
                  <Text>Range</Text>
                  <Text>{netNextRange?.getNetRangeNext.range}</Text>
                </Group>
                <Group mt={'md'} position={'apart'}>
                  <Text>Broadcast</Text>
                  <Text>{netNextRange?.getNetRangeNext.broadcast}</Text>
                </Group>
                <Accordion ml={-17} mr={-17} p={0}>
                  <Accordion.Item value={'more'}>
                    <Accordion.Control>More informations…</Accordion.Control>
                    <Accordion.Panel>
                      <Grid columns={6} ml={'xs'}>
                        <Grid.Col span={4}>Addresses</Grid.Col>
                        <Grid.Col span={2}
                                  ta={'right'}>{netNextRange?.getNetRangeNext.size}</Grid.Col>
                        <Grid.Col span={4}>First addressable host</Grid.Col>
                        <Grid.Col span={2}
                                  ta={'right'}>{netNextRange?.getNetRangeNext.first}</Grid.Col>
                        <Grid.Col span={4}>Last addressable host</Grid.Col>
                        <Grid.Col span={2}
                                  ta={'right'}>{netNextRange?.getNetRangeNext.last}</Grid.Col>
                      </Grid>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Card.Section>
            </Card>
          </Grid.Col>
        )}
      </Grid>
    </>
  )
}
