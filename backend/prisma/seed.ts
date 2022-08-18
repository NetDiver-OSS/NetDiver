import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const defaultVlan = await prisma.vlans.create({
    data: {
      name: 'default',
      description: 'Default VLAN',
      vlanId: 1,
    },
  });

  const serverVlan = await prisma.vlans.create({
    data: {
      name: 'servers',
      description: 'Servers VLAN',
      vlanId: 2,
    },
  });

  const serversSection = await prisma.sections.create({
    data: {
      name: 'servers',
      description: 'Servers section',
      network: '10.0.0.0/24',
      schedule: '0 10 * * *',
      vlanId: 2,
    },
  });
  const iotSection = await prisma.sections.create({
    data: {
      name: 'iot',
      description: 'IOT section',
      network: '192.168.0.0/24',
      schedule: '0 11 * * *',
      vlanId: 1,
    },
  });

  const defaultDevicesType = await prisma.devicesTypes.create({
    data: {
      name: 'rack server',
      color: 'FF0000',
    },
  });

  const pve1Device = await prisma.devices.create({
    data: {
      name: 'pve1.example.org',
      rackHeight: 1,
      depthType: 3,
      deviceTypeId: 1,
    },
  });

  const pve2Device = await prisma.devices.create({
    data: {
      name: 'pve2.example.org',
      rackHeight: 1,
      depthType: 3,
      deviceTypeId: 1,
    },
  });

  const pve3Device = await prisma.devices.create({
    data: {
      name: 'pve3.example.org',
      rackHeight: 1,
      depthType: 3,
      deviceTypeId: 1,
    },
  });

  const pve1Usage = await prisma.usages.create({
    data: {
      ipUsed: '10.0.0.2',
      sectionId: 1,
      fqdn: 'pve1.example.org',
      identifier: '10.0.0.2_2',
      status: 'ACTIVE',
      deviceId: 1,
    },
  });

  const pve2Usage = await prisma.usages.create({
    data: {
      ipUsed: '10.0.0.3',
      sectionId: 1,
      fqdn: 'pve2.example.org',
      identifier: '10.0.0.3_2',
      status: 'ACTIVE',
      deviceId: 2,
    },
  });

  const pve3Usage = await prisma.usages.create({
    data: {
      ipUsed: '10.0.0.4',
      sectionId: 1,
      fqdn: 'pve3.example.org',
      identifier: '10.0.0.4_2',
      status: 'ACTIVE',
      deviceId: 3,
    },
  });

  const rtrUsage = await prisma.usages.create({
    data: {
      ipUsed: '10.0.0.254',
      sectionId: 1,
      fqdn: 'srvrtr01.example.org',
      identifier: '10.0.0.254_2',
      status: 'LOCKED',
    },
  });

  const iot1Usage = await prisma.usages.create({
    data: {
      ipUsed: '192.168.0.254',
      sectionId: 2,
      fqdn: 'iotrtr01.example.org',
      identifier: '192.168.0.254_1',
      status: 'LOCKED',
    },
  });

  const iot2Usage = await prisma.usages.create({
    data: {
      ipUsed: '192.168.0.2',
      sectionId: 2,
      fqdn: 'iot2.example.org',
      identifier: '192.168.0.2_1',
      status: 'DHCP',
    },
  });

  const rack1Rackspace = await prisma.rackSpaces.create({
    data: {
      name: 'Rack1',
      unitHeight: 48,
      location: 'DC1',
    },
  });

  const rack2Rackspace = await prisma.rackSpaces.create({
    data: {
      name: 'Rack2',
      unitHeight: 24,
      location: 'DC1',
    },
  });

  const rack1Occup = await prisma.rackOccupations.create({
    data: {
      rackAnchor: 1,
      rackspaceId: 1,
      deviceId: 1,
    },
  });

  const rack2Occup = await prisma.rackOccupations.create({
    data: {
      rackAnchor: 1,
      rackspaceId: 2,
      deviceId: 2,
    },
  });

  const rack3Occup = await prisma.rackOccupations.create({
    data: {
      rackAnchor: 2,
      rackspaceId: 2,
      deviceId: 3,
    },
  });

  const mac1Addr = await prisma.macAddresses.create({
    data: {
      mac: '00-22-72',
      vendor: 'American Micro-Fuel Device Corp.',
    },
  });

  const mac2Addr = await prisma.macAddresses.create({
    data: {
      mac: '00-D0-EF',
      vendor: 'IGT',
    },
  });

  const mac3Addr = await prisma.macAddresses.create({
    data: {
      mac: '98-E7-43',
      vendor: 'Dell Inc.',
    },
  });

  const mac4Addr = await prisma.macAddresses.create({
    data: {
      mac: 'C8-F7-50',
      vendor: 'Dell Inc.',
    },
  });

  const mac5Addr = await prisma.macAddresses.create({
    data: {
      mac: '6C-2B-59',
      vendor: 'Dell Inc.',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
