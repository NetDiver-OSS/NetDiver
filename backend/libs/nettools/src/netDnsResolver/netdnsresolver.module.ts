import { Module } from '@nestjs/common';
import { NetDnsResolverResolver } from '@netdiver/nettools/netDnsResolver/netdnsresolver.resolver';

@Module({
  imports: [],
  providers: [NetDnsResolverResolver],
})
export class NetDnsResolverModule {}
