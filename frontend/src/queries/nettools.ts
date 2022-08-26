import { gql } from '@apollo/client'

export const GET_MAC_ADDRESS_AND_VENDORS = gql`
    query GetMacAddressesAndVendors {
        getMacAddressesAndVendors {
            id
            mac
            vendor
        }
    }
`
