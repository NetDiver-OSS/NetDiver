import React, { FunctionComponent, useState } from 'react'
import { Group, Box, Collapse, ThemeIcon, UnstyledButton, createStyles } from '@mantine/core'
import { TablerIcon, IconChevronRight } from '@tabler/icons'
import { Link, useNavigate } from 'react-router-dom'

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    }
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black
    }
  },

  chevron: {
    transition: 'transform 200ms ease'
  }
}))

interface LinksGroupProps {
  icon: TablerIcon
  label: string
  initiallyOpened?: boolean
  link?: string
  links?: Array<{ label: string, link: string }>
}

export const LinksGroup: FunctionComponent<LinksGroupProps> = ({ icon: Icon, label, initiallyOpened, link, links }: LinksGroupProps) => {
  const { classes } = useStyles()
  const hasLinks = Array.isArray(links)
  const navigate = useNavigate()
  const [opened, setOpened] = useState(initiallyOpened ?? false)
  const items = (hasLinks ? links : []).map((l) => (
    <Link key={l.label} to={l.link} className={classes.link}>{l.label}</Link>
  ))

  const handleLinkClick = (): void => {
    if (link != null) {
      navigate(link)
      return
    }

    setOpened((o) => !o)
  }

  return (
    <>
      <UnstyledButton onClick={handleLinkClick} className={classes.control}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened ? 'rotate(90deg)' : 'none'
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}
