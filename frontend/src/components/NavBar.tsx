import { Code, createStyles, Group, Menu, Navbar, ScrollArea } from '@mantine/core'
import { LinksGroup } from './LinksGroup'
import {
  IconGauge, IconLogout,
  IconMask,
  IconSettings,
  IconTools
} from '@tabler/icons'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { UserButton } from './UserButton'
import { useKeycloak } from '@react-keycloak/web'
import { KeycloakProfile } from 'keycloak-js'

const mockdata = [
  {
    label: 'Dashboard',
    icon: IconGauge,
    link: '/'
  },
  {
    label: 'NetAM',
    icon: IconMask,
    initiallyOpened: true,
    links: [
      { label: 'Sections', link: '/netam/sections' },
      { label: 'VLANs', link: '/netam/vlans' },
      { label: 'Devices', link: '/netam/devices' },
      { label: 'RackSpace', link: '/netam/rackspace' }
    ]
  },
  {
    label: 'NetTools',
    icon: IconTools,
    links: [
      { label: 'Mac Address Finder', link: '/nettools/macaddress' },
      { label: 'IP Range Calculator', link: '/nettools/ipcalculator' },
      { label: 'DNS Resolver', link: '/nettools/dnsresolver' }
    ]
  },
  {
    label: 'Administration',
    icon: IconSettings,
    links: [
      { label: 'Workers', link: '/admin/workers' },
      { label: 'Settings', link: '/admin/settings' }
    ]
  }
]

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`
  }
}))

export const NavBar: FunctionComponent = () => {
  const { classes } = useStyles()
  const { initialized, keycloak } = useKeycloak()
  const [user, setUser] = useState<KeycloakProfile | null>(null)

  const handleLogout = (): void => {
    void keycloak?.logout()
  }

  useEffect(() => {
    void keycloak?.loadUserProfile().then((profile) => {
      setUser(profile)
    })
  }, [])

  if (!initialized || (user == null)) {
    return null
  }

  return (
    <Navbar height={'100vh'} width={{ sm: 300 }} p="md" className={classes.navbar}>
    <Navbar.Section className={classes.header}>
      <Group position="apart">
        {/* <Logo width={120} /> */}
        <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
      </Group>
    </Navbar.Section>

    <Navbar.Section grow className={classes.links} component={ScrollArea}>
      <div className={classes.linksInner}>
        {mockdata.map((item) => <LinksGroup {...item} key={item.label}/>)}
      </div>
    </Navbar.Section>

      <Menu transition="pop" position="bottom-end">
        <Menu.Target>
          <Navbar.Section className={classes.footer}>
            <UserButton
             image="https://images.unsplash.com/photo-1xlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
             name={`${user.firstName ?? ''} ${user.lastName ?? ''}`}
             email={user.email ?? ''}
            />
          </Navbar.Section>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconLogout size={14} />} color="red" onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
  </Navbar>
  )
}
