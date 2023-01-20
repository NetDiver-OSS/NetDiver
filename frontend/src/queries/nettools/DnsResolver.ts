import { gql } from '@apollo/client'

export const GET_DNS_RESOLVE = gql`
    query GetDnsResolution ($request: String!, $type: String!){
        getDnsResolution(request: $request, type: $type){
            a
            aaaa
            caa{
                critical
                issue
                issuewild
                iodef
                contactemail
                contactphone
            }
            cname
            mx{
                priority
                exchange
            }
            naptr {
                flags
                service
                regexp
                replacement
                order
                preference
            }
            ns
            ptr
            soa {
                nsname
                hostmaster
                serial
                refresh
                retry
                expire
                minttl
            }
            srv {
                priority
                weight
                port
                name
            }
            txt
        }
    }
`
