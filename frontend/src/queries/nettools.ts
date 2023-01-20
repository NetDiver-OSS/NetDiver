import { gql } from '@apollo/client'

export const GET_MAC_ADDRESS_AND_VENDORS = gql`
    query GetMacAddressesAndVendors($page: PageInfo!) {
        getMacAddressesAndVendors(page: $page) {
            data {
                id
                mac
                vendor
            }
        }
    }
`
export const GET_MAC_ADDRESS = gql`
    query GetMacAddress($macPrefix: String!) {
        getMacAddress(macprefix: $macPrefix) {
            id
            mac
            vendor
        }
    }
`

export const GET_VENDOR = gql`
    query GetVendor($vendor: String!) {
        getVendor(vendor: $vendor) {
            id
            mac
            vendor
        }
    }
`
export const GET_NET_RANGE = gql`
    query GetNetRange($network: String!) {
        getNetRange(network: $network) {
            network
            broadcast
            bitmask
            mask
            size
            range
            first
            last
        }
    }
`

export const GET_NET_PREV_RANGE = gql`
    query GetNetPreviousRange($network: String!) {
        getNetRangePrevious(network: $network) {
            network
            broadcast
            bitmask
            mask
            size
            range
            first
            last
        }
    }
`
export const GET_NET_NEXT_RANGE = gql`
    query GetNetNextRange($network: String!) {
        getNetRangeNext(network: $network) {
            network
            broadcast
            bitmask
            mask
            size
            range
            first
            last
        }
    }
`
export const GET_NET_RANGE_SPLIT = gql`
    query GetNetRangeSplit(
        $network: String!,
        $into: String!
    ) {
        getNetRangeSplit(
            network: $network,
            into: $into
        ){
            splited
        }
    }
`
