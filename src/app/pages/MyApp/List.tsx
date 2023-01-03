import { useTranslation, withTranslation } from 'react-i18next'
import { Button, Title, Space, Text, Group, Anchor } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IconPlus } from '@tabler/icons'
import { APPLICATION_CREATE, APPLICATION_MODIFY } from 'common'
import { useAppSelector } from '@redux/hooks'
import Spinner from 'app/components/LoadingSpinner/Spinner'
import { selectApplicationListItems } from './slice/selector'
import { I } from './slice/type'
import CustomTable, { TableColumn } from './components/Table'
import LoadingBadge from './components/LoadingBadge'

const translatePrefix = 'app.table'
// column title with react-i18next
const useWithTranslationCol = (page: number, size: number) => {
  const { t } = useTranslation()
  const columns: TableColumn<I>[] = [
    {
      key: 'index',
      title: '',
      dataIndex: 'id',
      render(_, __, index) {
        return page * size + index + 1
      },
      width: 50
    },

    {
      key: 'name',
      title: t(`${translatePrefix}.appName`),
      dataIndex: 'name',
      ellipsis: true,

      render: (value, record) => (
        <Anchor
          component={Link}
          to={`${record.id}`}
          state={{
            readonly: true
          }}
        >
          {value}
        </Anchor>
      )
    },
    {
      key: 'gameName',
      title: t(`${translatePrefix}.gameName`),
      dataIndex: 'gameName',
      ellipsis: true
    },
    {
      key: 'type',
      title: t(`${translatePrefix}.service`),
      dataIndex: 'type',
      ellipsis: true
    },
    {
      key: 'restricted',
      title: t(`${translatePrefix}.token`),
      dataIndex: 'restricted',
      render: value => (
        // <Center className="gap-4">
        //   <Text>{translateBoolean(value)}</Text>
        //   <Button size="xs">Renew</Button>
        // </Center>

        <LoadingBadge
          status={value ? 'normal' : 'error'}
          action={async () =>
            new Promise(resolve => {
              console.log(`badge action: ${Math.random()}`)
              setTimeout(resolve, 2000)
            })
          }
        />
      ),
      width: 200
    },
    {
      key: 'function',
      // title: t(`${translatePrefix}.func`),
      title: '',
      dataIndex: 'id',
      width: 100,
      render: value => (
        <Button
          variant="subtle"
          component={Link}
          to={`${APPLICATION_MODIFY}/${value}`}
        >
          Edit
        </Button>
      )
    }
  ]
  return columns
}

export function AppList({ t }) {
  const meta = {
    page: 0,
    size: 10
  }
  const columns = useWithTranslationCol(meta.page, meta.size)
  const data = useSelector(selectApplicationListItems)
  const loading = useAppSelector(state => state.application.loading)

  return (
    <div className="relative">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Title order={2}>{t('app.myPage.title')}</Title>
          <Group position="right">
            <Button
              leftIcon={<IconPlus size="14px" />}
              component={Link}
              to={APPLICATION_CREATE}
            >
              Register application
            </Button>
          </Group>
          <Space h="md" />
          <CustomTable
            columns={columns}
            data={data}
            maxRow={100}
            empty={
              <Text className="py-10" align="center">
                There is no registered application
              </Text>
            }
          />
        </>
      )}
    </div>
  )
}

export default withTranslation()(AppList)
