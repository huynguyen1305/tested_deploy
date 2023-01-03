import {
  Title,
  Text,
  Button,
  Container,
  Image,
  Modal,
  Group
} from '@mantine/core'
import { withTranslation } from 'react-i18next'
import { IconChevronsRight } from '@tabler/icons'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { ApiResponse } from 'common/type'
import Spinner from 'app/components/LoadingSpinner/Spinner'
import { useNavigate } from 'react-router-dom'
import { Application } from '../slice/type'

function ApplicationList({ t }) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Application[]>()
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()

  const fetchApplicationList = async () => {
    setLoading(true)
    try {
      const response = await axios.get<ApiResponse<Application>>(
        `/application/community`
      )
      setData(response.data.data)
      setLoading(false)
    } catch (err) {
      console.warn(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplicationList()
  }, [])

  return (
    <>
      <Modal
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        title="Are you sure to redirect to this page"
        className="mt-8"
      >
        <Group position="center">
          <Button onClick={() => navigate(0)}>{t('common.yes')}</Button>
          <Button variant="default" onClick={() => setIsOpen(false)}>
            {t('common.no')}
          </Button>
        </Group>
      </Modal>
      {loading && <Spinner />}
      <Text size="lg" className="my-8">
        {t('app.application.pageSubtitle')}
      </Text>
      <Container className="grid grid-cols-3 gap-x-4 gap-y-[120px]" size={1500}>
        {data?.map(item => (
          <div key={item.id} className="p-4">
            <Title order={4} className="mb-5">
              {item.name}
            </Title>
            <div className="w-full mb-5">
              <Image
                src={item.imageUrl}
                alt="app-img"
                className="w-[100%]"
                withPlaceholder
                height={300}
              />
            </div>
            <div className="h-[100px]">
              <Text className="line-clamp-4">{item.description}</Text>
            </div>

            <Button
              onClick={() => setIsOpen(true)}
              rightIcon={<IconChevronsRight />}
              className="mt-4"
            >
              {t('app.application.gotoService')}
            </Button>
          </div>
        ))}
      </Container>
    </>
  )
}

export default withTranslation()(ApplicationList)
