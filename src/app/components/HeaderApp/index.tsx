import {
  ActionIcon,
  Group,
  Header,
  Title,
  Button,
  useMantineColorScheme,
  NavLink as NavMantine
} from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons'
import {
  Link,
  useNavigate,
  useLocation,
  NavLink as NavRouterDom
} from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { DOC, API, SUPPORT, APPLICATION, DOCS, MY_APP, FAQ } from 'common'

export function AppNavigator({ t }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const routes = [
    { label: t('pages.document'), path: DOC },
    {
      label: t('pages.api'),
      path: API
    },
    {
      label: t('pages.support'),
      path: FAQ
    },
    // { label: t('pages.forum'), path: FORUM },
    { label: t('pages.app'), path: APPLICATION }
  ]

  return (
    <div>
      <Header height={60} p="xs" className="justify-start px-8">
        {/* Header content */}
        <Group sx={{ height: '100%' }} position="apart">
          <Group
            sx={{ gap: '0', marginLeft: '12px', cursor: 'pointer' }}
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
          <Group>
            <div style={{ display: 'flex' }}>
              {routes.map(route => (
                <NavMantine
                  component={NavRouterDom}
                  variant="subtle"
                  to={
                    route.path === SUPPORT ? `${SUPPORT}/${DOCS}` : route.path
                  }
                  key={route.label}
                  label={route.label}
                  active={location.pathname.includes(route.path)}
                  sx={{ fontWeight: 'bold' }}
                />
              ))}
            </div>
          </Group>
          <Group>
            <Button
              className="font-normal"
              component={Link}
              to={MY_APP}
              variant={
                // eslint-disable-next-line no-restricted-globals, no-undef
                location.pathname.includes(MY_APP) ? 'filled' : 'default'
              }
            >
              My page
            </Button>
            <Button variant="default" className="font-normal">
              Logout
            </Button>
            <ActionIcon
              variant="default"
              onClick={() => toggleColorScheme()}
              size={30}
            >
              {colorScheme === 'dark' ? (
                <IconSun size={16} />
              ) : (
                <IconMoonStars size={16} />
              )}
            </ActionIcon>
          </Group>
        </Group>
      </Header>
    </div>
  )
}

export default withTranslation()(AppNavigator)
