import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Title, Container, Center, Text } from '@mantine/core'

export default function NotFoundPage() {
  return (
    <Container>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Center>
        <Title>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </Title>
        <Text>Page not found.</Text>
      </Center>
    </Container>
  )
}
