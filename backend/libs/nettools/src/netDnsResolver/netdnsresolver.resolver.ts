import { Args, Query, Resolver } from '@nestjs/graphql';
import { NetDnsResolver } from './netdnsresolver.model';
import { resolve } from 'dns/promises';

@Resolver(() => NetDnsResolver)
export class NetDnsResolverResolver {
  @Query(() => NetDnsResolver)
  async getDnsResolution(
    @Args('request') request: string,
    @Args('type') type: string,
  ): Promise<NetDnsResolver> {
    const Record = new NetDnsResolver();

    switch (type.toUpperCase()) {
      case 'A':
        Record.a = await resolve(request, 'A');
        break;
      case 'AAAA':
        Record.aaaa = await resolve(request, 'AAAA');
        break;
      case 'CAA':
        // @ts-ignore
        Record.caa = await resolve(request, 'CAA');
        break;
      case 'CNAME':
        Record.cname = await resolve(request, 'CNAME');
        break;
      case 'MX':
        Record.mx = await resolve(request, 'MX');
        break;
      case 'NAPTR':
        Record.naptr = await resolve(request, 'NAPTR');
        break;
      case 'NS':
        Record.ns = await resolve(request, 'NS');
        break;
      case 'PTR':
        Record.ptr = await resolve(request, 'PTR');
        break;
      case 'SOA':
        Record.soa = await resolve(request, 'SOA');
        break;
      case 'SRV':
        Record.srv = await resolve(request, 'SRV');
        break;
      case 'TXT':
        Record.txt = await resolve(request, 'TXT');
        break;
    }

    return Record;
  }
}
