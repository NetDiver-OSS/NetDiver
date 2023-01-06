import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Timestamp: any;
};

export type CaaType = {
  __typename?: 'CaaType';
  contactemail?: Maybe<Scalars['String']>;
  contactphone?: Maybe<Scalars['String']>;
  critical: Scalars['Int'];
  iodef?: Maybe<Scalars['String']>;
  issue?: Maybe<Scalars['String']>;
  issuewild?: Maybe<Scalars['String']>;
};

export type MacAddress = {
  __typename?: 'MacAddress';
  id: Scalars['Int'];
  mac: Scalars['String'];
  vendor?: Maybe<Scalars['String']>;
};

export type MxType = {
  __typename?: 'MxType';
  exchange: Scalars['String'];
  priority: Scalars['Int'];
};

export type NaptrType = {
  __typename?: 'NaptrType';
  flags: Scalars['String'];
  order: Scalars['Int'];
  preference: Scalars['Int'];
  regexp: Scalars['String'];
  replacement: Scalars['String'];
  service: Scalars['String'];
};

export type NetCalculator = {
  __typename?: 'NetCalculator';
  bitmask?: Maybe<Scalars['String']>;
  broadcast?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['String']>;
  last?: Maybe<Scalars['String']>;
  mask?: Maybe<Scalars['String']>;
  network?: Maybe<Scalars['String']>;
  range?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  splited?: Maybe<Array<Scalars['String']>>;
};

export type NetDnsResolver = {
  __typename?: 'NetDnsResolver';
  a?: Maybe<Array<Scalars['String']>>;
  aaaa?: Maybe<Array<Scalars['String']>>;
  caa?: Maybe<Array<CaaType>>;
  cname?: Maybe<Array<Scalars['String']>>;
  mx?: Maybe<Array<MxType>>;
  naptr?: Maybe<Array<NaptrType>>;
  ns?: Maybe<Array<Scalars['String']>>;
  ptr?: Maybe<Array<Scalars['String']>>;
  soa?: Maybe<SoaType>;
  srv?: Maybe<Array<SrvType>>;
  txt?: Maybe<Array<Array<Scalars['String']>>>;
};

export type OuiSync = {
  __typename?: 'OuiSync';
  result: Scalars['Boolean'];
};

export type PageInfo = {
  cursor?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
};

export type PaginatedMacAddress = {
  __typename?: 'PaginatedMacAddress';
  data?: Maybe<Array<MacAddress>>;
  total?: Maybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  createVlan: Vlan;
  deleteVlan: Vlan;
  getDnsResolution: NetDnsResolver;
  getMacAddress: Array<MacAddress>;
  getMacAddressesAndVendors: PaginatedMacAddress;
  getNetRange: NetCalculator;
  getNetRangeNext: NetCalculator;
  getNetRangePrevious: NetCalculator;
  getNetRangeSplit: NetCalculator;
  getSectionByVlanName: Array<Section>;
  getSectionId: Section;
  getSectionName: Array<Section>;
  getSectionNetwork: Array<Section>;
  getSectionScanType: Array<Section>;
  getSections: Array<Section>;
  getUsageFqdn: Array<Usage>;
  getUsageId: Usage;
  getUsageStatus: Array<Usage>;
  getUsages: Array<Usage>;
  getVendor: Array<MacAddress>;
  getVlanId: Vlan;
  getVlanName: Array<Vlan>;
  getVlans: Array<Vlan>;
  syncOuiDatabase: OuiSync;
  updateVlan: Vlan;
};


export type QueryCreateVlanArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  vlanId: Scalars['Int'];
};


export type QueryDeleteVlanArgs = {
  id: Scalars['Int'];
};


export type QueryGetDnsResolutionArgs = {
  request: Scalars['String'];
  type: Scalars['String'];
};


export type QueryGetMacAddressArgs = {
  macprefix: Scalars['String'];
};


export type QueryGetMacAddressesAndVendorsArgs = {
  page: PageInfo;
};


export type QueryGetNetRangeArgs = {
  network: Scalars['String'];
};


export type QueryGetNetRangeNextArgs = {
  network: Scalars['String'];
};


export type QueryGetNetRangePreviousArgs = {
  network: Scalars['String'];
};


export type QueryGetNetRangeSplitArgs = {
  into: Scalars['String'];
  network: Scalars['String'];
};


export type QueryGetSectionByVlanNameArgs = {
  vlan: Scalars['String'];
};


export type QueryGetSectionIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetSectionNameArgs = {
  name: Scalars['String'];
};


export type QueryGetSectionNetworkArgs = {
  network: Scalars['String'];
};


export type QueryGetSectionScanTypeArgs = {
  scantype: Scalars['String'];
};


export type QueryGetUsageFqdnArgs = {
  fqdn: Scalars['String'];
};


export type QueryGetUsageIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetUsageStatusArgs = {
  status: Scalars['String'];
};


export type QueryGetVendorArgs = {
  vendor: Scalars['String'];
};


export type QueryGetVlanIdArgs = {
  vlanId: Scalars['Int'];
};


export type QueryGetVlanNameArgs = {
  name: Scalars['String'];
};


export type QueryUpdateVlanArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  vlanId?: InputMaybe<Scalars['Int']>;
};

export type Section = {
  __typename?: 'Section';
  createdAt: Scalars['Timestamp'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  network: Scalars['String'];
  scantype: Scalars['String'];
  schedule?: Maybe<Scalars['String']>;
  usages?: Maybe<Array<Usage>>;
  vlan: Vlan;
};

export type SoaType = {
  __typename?: 'SoaType';
  expire: Scalars['Int'];
  hostmaster: Scalars['String'];
  minttl: Scalars['Int'];
  nsname: Scalars['String'];
  refresh: Scalars['Int'];
  retry: Scalars['Int'];
  serial: Scalars['Int'];
};

export type SrvType = {
  __typename?: 'SrvType';
  name: Scalars['String'];
  port: Scalars['Int'];
  priority: Scalars['Int'];
  weight: Scalars['Int'];
};

export type Usage = {
  __typename?: 'Usage';
  createdAt: Scalars['Timestamp'];
  description?: Maybe<Scalars['String']>;
  fqdn?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  identifier: Scalars['String'];
  ipUsed: Scalars['String'];
  status: Scalars['String'];
};

export type Vlan = {
  __typename?: 'Vlan';
  createdAt: Scalars['Timestamp'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  sections?: Maybe<Array<Section>>;
  vlanId: Scalars['Int'];
};

export type GetMacAddressesAndVendorsQueryVariables = Exact<{
  page: PageInfo;
}>;


export type GetMacAddressesAndVendorsQuery = { __typename?: 'Query', getMacAddressesAndVendors: { __typename?: 'PaginatedMacAddress', data?: Array<{ __typename?: 'MacAddress', id: number, mac: string, vendor?: string | null }> | null } };

export type GetMacAddressQueryVariables = Exact<{
  macPrefix: Scalars['String'];
}>;


export type GetMacAddressQuery = { __typename?: 'Query', getMacAddress: Array<{ __typename?: 'MacAddress', id: number, mac: string, vendor?: string | null }> };

export type GetVendorQueryVariables = Exact<{
  vendor: Scalars['String'];
}>;


export type GetVendorQuery = { __typename?: 'Query', getVendor: Array<{ __typename?: 'MacAddress', id: number, mac: string, vendor?: string | null }> };

export type GetNetRangeQueryVariables = Exact<{
  network: Scalars['String'];
}>;


export type GetNetRangeQuery = { __typename?: 'Query', getNetRange: { __typename?: 'NetCalculator', network?: string | null, broadcast?: string | null, bitmask?: string | null, mask?: string | null, size?: string | null, range?: string | null, first?: string | null, last?: string | null } };

export type GetNetPreviousRangeQueryVariables = Exact<{
  network: Scalars['String'];
}>;


export type GetNetPreviousRangeQuery = { __typename?: 'Query', getNetRangePrevious: { __typename?: 'NetCalculator', network?: string | null, broadcast?: string | null, bitmask?: string | null, mask?: string | null, size?: string | null, range?: string | null, first?: string | null, last?: string | null } };

export type GetNetNextRangeQueryVariables = Exact<{
  network: Scalars['String'];
}>;


export type GetNetNextRangeQuery = { __typename?: 'Query', getNetRangeNext: { __typename?: 'NetCalculator', network?: string | null, broadcast?: string | null, bitmask?: string | null, mask?: string | null, size?: string | null, range?: string | null, first?: string | null, last?: string | null } };

export type GetNetRangeSplitQueryVariables = Exact<{
  network: Scalars['String'];
  into: Scalars['String'];
}>;


export type GetNetRangeSplitQuery = { __typename?: 'Query', getNetRangeSplit: { __typename?: 'NetCalculator', splited?: Array<string> | null } };

export type GetDnsResolutionQueryVariables = Exact<{
  request: Scalars['String'];
  type: Scalars['String'];
}>;


export type GetDnsResolutionQuery = { __typename?: 'Query', getDnsResolution: { __typename?: 'NetDnsResolver', a?: Array<string> | null, aaaa?: Array<string> | null, cname?: Array<string> | null, ns?: Array<string> | null, ptr?: Array<string> | null, txt?: Array<Array<string>> | null, caa?: Array<{ __typename?: 'CaaType', critical: number, issue?: string | null, issuewild?: string | null, iodef?: string | null, contactemail?: string | null, contactphone?: string | null }> | null, mx?: Array<{ __typename?: 'MxType', priority: number, exchange: string }> | null, naptr?: Array<{ __typename?: 'NaptrType', flags: string, service: string, regexp: string, replacement: string, order: number, preference: number }> | null, soa?: { __typename?: 'SoaType', nsname: string, hostmaster: string, serial: number, refresh: number, retry: number, expire: number, minttl: number } | null, srv?: Array<{ __typename?: 'SrvType', priority: number, weight: number, port: number, name: string }> | null } };


export const GetMacAddressesAndVendorsDocument = gql`
    query GetMacAddressesAndVendors($page: PageInfo!) {
  getMacAddressesAndVendors(page: $page) {
    data {
      id
      mac
      vendor
    }
  }
}
    `;

/**
 * __useGetMacAddressesAndVendorsQuery__
 *
 * To run a query within a React component, call `useGetMacAddressesAndVendorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMacAddressesAndVendorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMacAddressesAndVendorsQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetMacAddressesAndVendorsQuery(baseOptions: Apollo.QueryHookOptions<GetMacAddressesAndVendorsQuery, GetMacAddressesAndVendorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMacAddressesAndVendorsQuery, GetMacAddressesAndVendorsQueryVariables>(GetMacAddressesAndVendorsDocument, options);
      }
export function useGetMacAddressesAndVendorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMacAddressesAndVendorsQuery, GetMacAddressesAndVendorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMacAddressesAndVendorsQuery, GetMacAddressesAndVendorsQueryVariables>(GetMacAddressesAndVendorsDocument, options);
        }
export type GetMacAddressesAndVendorsQueryHookResult = ReturnType<typeof useGetMacAddressesAndVendorsQuery>;
export type GetMacAddressesAndVendorsLazyQueryHookResult = ReturnType<typeof useGetMacAddressesAndVendorsLazyQuery>;
export type GetMacAddressesAndVendorsQueryResult = Apollo.QueryResult<GetMacAddressesAndVendorsQuery, GetMacAddressesAndVendorsQueryVariables>;
export const GetMacAddressDocument = gql`
    query GetMacAddress($macPrefix: String!) {
  getMacAddress(macprefix: $macPrefix) {
    id
    mac
    vendor
  }
}
    `;

/**
 * __useGetMacAddressQuery__
 *
 * To run a query within a React component, call `useGetMacAddressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMacAddressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMacAddressQuery({
 *   variables: {
 *      macPrefix: // value for 'macPrefix'
 *   },
 * });
 */
export function useGetMacAddressQuery(baseOptions: Apollo.QueryHookOptions<GetMacAddressQuery, GetMacAddressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMacAddressQuery, GetMacAddressQueryVariables>(GetMacAddressDocument, options);
      }
export function useGetMacAddressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMacAddressQuery, GetMacAddressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMacAddressQuery, GetMacAddressQueryVariables>(GetMacAddressDocument, options);
        }
export type GetMacAddressQueryHookResult = ReturnType<typeof useGetMacAddressQuery>;
export type GetMacAddressLazyQueryHookResult = ReturnType<typeof useGetMacAddressLazyQuery>;
export type GetMacAddressQueryResult = Apollo.QueryResult<GetMacAddressQuery, GetMacAddressQueryVariables>;
export const GetVendorDocument = gql`
    query GetVendor($vendor: String!) {
  getVendor(vendor: $vendor) {
    id
    mac
    vendor
  }
}
    `;

/**
 * __useGetVendorQuery__
 *
 * To run a query within a React component, call `useGetVendorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVendorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVendorQuery({
 *   variables: {
 *      vendor: // value for 'vendor'
 *   },
 * });
 */
export function useGetVendorQuery(baseOptions: Apollo.QueryHookOptions<GetVendorQuery, GetVendorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVendorQuery, GetVendorQueryVariables>(GetVendorDocument, options);
      }
export function useGetVendorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVendorQuery, GetVendorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVendorQuery, GetVendorQueryVariables>(GetVendorDocument, options);
        }
export type GetVendorQueryHookResult = ReturnType<typeof useGetVendorQuery>;
export type GetVendorLazyQueryHookResult = ReturnType<typeof useGetVendorLazyQuery>;
export type GetVendorQueryResult = Apollo.QueryResult<GetVendorQuery, GetVendorQueryVariables>;
export const GetNetRangeDocument = gql`
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
    `;

/**
 * __useGetNetRangeQuery__
 *
 * To run a query within a React component, call `useGetNetRangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNetRangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNetRangeQuery({
 *   variables: {
 *      network: // value for 'network'
 *   },
 * });
 */
export function useGetNetRangeQuery(baseOptions: Apollo.QueryHookOptions<GetNetRangeQuery, GetNetRangeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNetRangeQuery, GetNetRangeQueryVariables>(GetNetRangeDocument, options);
      }
export function useGetNetRangeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNetRangeQuery, GetNetRangeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNetRangeQuery, GetNetRangeQueryVariables>(GetNetRangeDocument, options);
        }
export type GetNetRangeQueryHookResult = ReturnType<typeof useGetNetRangeQuery>;
export type GetNetRangeLazyQueryHookResult = ReturnType<typeof useGetNetRangeLazyQuery>;
export type GetNetRangeQueryResult = Apollo.QueryResult<GetNetRangeQuery, GetNetRangeQueryVariables>;
export const GetNetPreviousRangeDocument = gql`
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
    `;

/**
 * __useGetNetPreviousRangeQuery__
 *
 * To run a query within a React component, call `useGetNetPreviousRangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNetPreviousRangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNetPreviousRangeQuery({
 *   variables: {
 *      network: // value for 'network'
 *   },
 * });
 */
export function useGetNetPreviousRangeQuery(baseOptions: Apollo.QueryHookOptions<GetNetPreviousRangeQuery, GetNetPreviousRangeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNetPreviousRangeQuery, GetNetPreviousRangeQueryVariables>(GetNetPreviousRangeDocument, options);
      }
export function useGetNetPreviousRangeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNetPreviousRangeQuery, GetNetPreviousRangeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNetPreviousRangeQuery, GetNetPreviousRangeQueryVariables>(GetNetPreviousRangeDocument, options);
        }
export type GetNetPreviousRangeQueryHookResult = ReturnType<typeof useGetNetPreviousRangeQuery>;
export type GetNetPreviousRangeLazyQueryHookResult = ReturnType<typeof useGetNetPreviousRangeLazyQuery>;
export type GetNetPreviousRangeQueryResult = Apollo.QueryResult<GetNetPreviousRangeQuery, GetNetPreviousRangeQueryVariables>;
export const GetNetNextRangeDocument = gql`
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
    `;

/**
 * __useGetNetNextRangeQuery__
 *
 * To run a query within a React component, call `useGetNetNextRangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNetNextRangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNetNextRangeQuery({
 *   variables: {
 *      network: // value for 'network'
 *   },
 * });
 */
export function useGetNetNextRangeQuery(baseOptions: Apollo.QueryHookOptions<GetNetNextRangeQuery, GetNetNextRangeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNetNextRangeQuery, GetNetNextRangeQueryVariables>(GetNetNextRangeDocument, options);
      }
export function useGetNetNextRangeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNetNextRangeQuery, GetNetNextRangeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNetNextRangeQuery, GetNetNextRangeQueryVariables>(GetNetNextRangeDocument, options);
        }
export type GetNetNextRangeQueryHookResult = ReturnType<typeof useGetNetNextRangeQuery>;
export type GetNetNextRangeLazyQueryHookResult = ReturnType<typeof useGetNetNextRangeLazyQuery>;
export type GetNetNextRangeQueryResult = Apollo.QueryResult<GetNetNextRangeQuery, GetNetNextRangeQueryVariables>;
export const GetNetRangeSplitDocument = gql`
    query GetNetRangeSplit($network: String!, $into: String!) {
  getNetRangeSplit(network: $network, into: $into) {
    splited
  }
}
    `;

/**
 * __useGetNetRangeSplitQuery__
 *
 * To run a query within a React component, call `useGetNetRangeSplitQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNetRangeSplitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNetRangeSplitQuery({
 *   variables: {
 *      network: // value for 'network'
 *      into: // value for 'into'
 *   },
 * });
 */
export function useGetNetRangeSplitQuery(baseOptions: Apollo.QueryHookOptions<GetNetRangeSplitQuery, GetNetRangeSplitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNetRangeSplitQuery, GetNetRangeSplitQueryVariables>(GetNetRangeSplitDocument, options);
      }
export function useGetNetRangeSplitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNetRangeSplitQuery, GetNetRangeSplitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNetRangeSplitQuery, GetNetRangeSplitQueryVariables>(GetNetRangeSplitDocument, options);
        }
export type GetNetRangeSplitQueryHookResult = ReturnType<typeof useGetNetRangeSplitQuery>;
export type GetNetRangeSplitLazyQueryHookResult = ReturnType<typeof useGetNetRangeSplitLazyQuery>;
export type GetNetRangeSplitQueryResult = Apollo.QueryResult<GetNetRangeSplitQuery, GetNetRangeSplitQueryVariables>;
export const GetDnsResolutionDocument = gql`
    query GetDnsResolution($request: String!, $type: String!) {
  getDnsResolution(request: $request, type: $type) {
    a
    aaaa
    caa {
      critical
      issue
      issuewild
      iodef
      contactemail
      contactphone
    }
    cname
    mx {
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
    `;

/**
 * __useGetDnsResolutionQuery__
 *
 * To run a query within a React component, call `useGetDnsResolutionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDnsResolutionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDnsResolutionQuery({
 *   variables: {
 *      request: // value for 'request'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetDnsResolutionQuery(baseOptions: Apollo.QueryHookOptions<GetDnsResolutionQuery, GetDnsResolutionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDnsResolutionQuery, GetDnsResolutionQueryVariables>(GetDnsResolutionDocument, options);
      }
export function useGetDnsResolutionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDnsResolutionQuery, GetDnsResolutionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDnsResolutionQuery, GetDnsResolutionQueryVariables>(GetDnsResolutionDocument, options);
        }
export type GetDnsResolutionQueryHookResult = ReturnType<typeof useGetDnsResolutionQuery>;
export type GetDnsResolutionLazyQueryHookResult = ReturnType<typeof useGetDnsResolutionLazyQuery>;
export type GetDnsResolutionQueryResult = Apollo.QueryResult<GetDnsResolutionQuery, GetDnsResolutionQueryVariables>;