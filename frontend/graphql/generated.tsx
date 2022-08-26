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

export type MacAddress = {
  __typename?: 'MacAddress';
  id: Scalars['Int'];
  mac: Scalars['String'];
  vendor?: Maybe<Scalars['String']>;
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

export type Query = {
  __typename?: 'Query';
  getMacAddress: Array<MacAddress>;
  getMacAddressesAndVendors: Array<MacAddress>;
  getNetRange: NetCalculator;
  getNetRangeNext: NetCalculator;
  getNetRangePrevious: NetCalculator;
  getNetRangeSplit: NetCalculator;
  getSections: Array<Section>;
  getVendor: Array<MacAddress>;
  getVlan: Vlan;
  getVlans: Array<Vlan>;
};


export type QueryGetMacAddressArgs = {
  macprefix: Scalars['String'];
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


export type QueryGetVendorArgs = {
  vendor: Scalars['String'];
};


export type QueryGetVlanArgs = {
  id: Scalars['Int'];
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
  vlan: Vlan;
};

export type Vlan = {
  __typename?: 'Vlan';
  createdAt: Scalars['Timestamp'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  sections?: Maybe<Array<Section>>;
};

export type GetMacAddressesAndVendorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMacAddressesAndVendorsQuery = { __typename?: 'Query', getMacAddressesAndVendors: Array<{ __typename?: 'MacAddress', id: number, mac: string, vendor?: string | null }> };


export const GetMacAddressesAndVendorsDocument = gql`
    query GetMacAddressesAndVendors {
  getMacAddressesAndVendors {
    id
    mac
    vendor
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
 *   },
 * });
 */
export function useGetMacAddressesAndVendorsQuery(baseOptions?: Apollo.QueryHookOptions<GetMacAddressesAndVendorsQuery, GetMacAddressesAndVendorsQueryVariables>) {
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