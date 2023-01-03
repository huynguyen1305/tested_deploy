import {
  createStyles,
  Group,
  ActionIcon,
  Title,
  useMantineColorScheme,
  Box
} from '@mantine/core'
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram
} from '@tabler/icons'
import { withTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const useStyles = createStyles(theme => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 32px'
  },

  links: {
    marginRight: '3rem',
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md
    }
  }
}))

function AppFooter({ t }) {
  const { classes } = useStyles()
  const navigate = useNavigate()
  const { colorScheme } = useMantineColorScheme()

  return (
    <div className={classes.footer}>
      <Box className={classes.inner}>
        <Group
          sx={{ gap: '0', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <Title
            order={1}
            size="xl"
            color={colorScheme === 'dark' ? 'white' : 'black'}
            sx={{ width: 280, textAlign: 'left' }}
          >
            {t('nexon.appName')}
          </Title>
        </Group>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Box>
    </div>
  )
}

export default withTranslation()(AppFooter)
