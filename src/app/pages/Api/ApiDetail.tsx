import {
  Accordion,
  Badge,
  Box,
  Button,
  Col,
  createStyles,
  Grid,
  Stack,
  Text,
  Title
} from '@mantine/core'
import React from 'react'
import RenderObject from './RenderObject'

const useStyles = createStyles(theme => {
  const borderColor =
    theme.colorScheme === 'dark'
      ? `${theme.colors.dark[4]}!important`
      : `${theme.colors.gray[3]}!important`
  return {
    control: {
      borderBottom: `1px solid ${borderColor}`,
      borderRadius: '8px'
    },
    borderBottomText: {
      borderBottom: `1px solid ${borderColor}`
    }
  }
})

function ApiDetail({ data }) {
  const { classes } = useStyles()
  return (
    <Accordion.Item value={data.apiId}>
      <Accordion.Control className={classes.control}>
        <Grid align="center">
          <Col span={1}>
            <Badge size="xl">{data.apiMethod}</Badge>
          </Col>
          <Col span={4}>
            <Text weight={700}>{data.apiName}</Text>
          </Col>
          <Col span={4}>{data.apiName}</Col>
          <Col span={3}>
            {data.deprecated.isDeprecated && (
              <Grid align="center">
                <Col span={6}>
                  <Badge size="md" color="orange">
                    Deprecated
                  </Badge>
                </Col>
                <Col span={6}>
                  <Text color="orange" size="sm">
                    {new Date(
                      data.deprecated.deprecatedDate
                    ).toLocaleDateString('en-GB')}
                  </Text>
                </Col>
              </Grid>
            )}
          </Col>
        </Grid>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack sx={{ paddingTop: '1rem' }}>
          {data.deprecated.isDeprecated && (
            <p style={{ color: 'orange' }}>
              Notice: This API is deprecated and will be removed in{' '}
              <strong>
                {new Date(data?.deprecated.deprecatedDate).toLocaleDateString(
                  'en-GB'
                )}
              </strong>
              . Please use the new API instead.
            </p>
          )}

          <Box
            style={{
              borderRadius: '8px',
              border: '1px solid #eaeaea',
              padding: '1rem'
            }}
            dangerouslySetInnerHTML={{ __html: data.apiDescription }}
          />
          <br />

          <Box>
            <Grid>
              <Col span={6}>
                <Title
                  order={4}
                  sx={{
                    textDecoration: 'underline',
                    textDecorationColor: 'blue',
                    textDecorationThickness: '3px',
                    textUnderlineOffset: '8px'
                  }}
                >
                  Parameters
                </Title>
              </Col>
              <Col span={6} sx={{ textAlign: 'right' }}>
                <Button>Try it out</Button>
              </Col>
            </Grid>
            <Stack sx={{ marginLeft: '2rem' }}>
              <Grid className={classes.borderBottomText}>
                <Col span={3}>
                  <Text size="xs">Name</Text>
                </Col>
                <Col span={9}>
                  <Text size="xs">Description</Text>
                </Col>
              </Grid>
              <Box>
                {data.requestParams.length > 0 &&
                  data.requestParams.map(request => (
                    <Grid key={request.paramId}>
                      <Col span={3}>
                        <Box style={{ display: 'flex' }}>
                          <Text weight={700}>{request.keyLabel}</Text>
                          {request.isRequired && (
                            <Text
                              size="xs"
                              color="red"
                              sx={{ marginLeft: '4px' }}
                            >
                              *Is Require
                            </Text>
                          )}
                        </Box>
                        <Text size="xs" color="blue">
                          {request.type}
                        </Text>
                      </Col>
                      <Col span={9}>
                        <Text>{request.description}</Text>
                      </Col>
                    </Grid>
                  ))}
              </Box>
            </Stack>
          </Box>

          <br />
          <Box>
            <Grid>
              <Col span={6}>
                <Title order={4}>Response</Title>
              </Col>
            </Grid>
            <Stack sx={{ marginLeft: '2rem' }}>
              <Grid className={classes.borderBottomText}>
                <Col span={3}>
                  <Text size="xs">Code</Text>
                </Col>
                <Col span={9}>
                  <Text size="xs">Description</Text>
                </Col>
              </Grid>

              {data.responseCode.length > 0 &&
                data.responseCode.map(item => (
                  <Grid key={item.paramId}>
                    <Col span={3}>
                      <Text>{item.type}</Text>
                    </Col>
                    <Col span={9}>
                      <Text>{item.keyLabel}</Text>
                      <Box
                        sx={{
                          padding: '8px',
                          border: '1px solid grey',
                          margin: '8px 0',
                          borderRadius: '8px'
                        }}
                      >
                        <Text>{item.description}</Text>
                      </Box>
                    </Col>
                  </Grid>
                ))}
            </Stack>
          </Box>

          <br />
          <Grid>
            <Col span={6}>
              <Title order={4}>Model</Title>
            </Col>
            <Col span={12}>
              <Box
                sx={theme => ({
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],

                  padding: theme.spacing.xl,
                  margin: '0 2rem',
                  borderRadius: theme.radius.md
                })}
              >
                {data.responseParams.length > 0 &&
                  data.responseParams.map(response => {
                    if (response.subItem.length > 0)
                      return (
                        <Grid key={response.resParamId}>
                          <Col span={3}>
                            <Grid>
                              <Col span={12}>
                                <Text weight={700}>{response.keyLabel}</Text>
                              </Col>
                            </Grid>
                          </Col>
                          <Col span={9}>
                            <RenderObject response={response} />
                          </Col>
                        </Grid>
                      )
                    return (
                      <Grid key={response.resParamId}>
                        <Col span={3}>
                          <Text weight={700}>{response.keyLabel}</Text>
                        </Col>
                        <Col
                          span={9}
                          sx={{
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Text size="xs" color="blue">
                            {response.type}
                          </Text>
                          <Text sx={{ marginLeft: '8px' }}>
                            {response.description}
                          </Text>
                        </Col>
                      </Grid>
                    )
                  })}
              </Box>
            </Col>
          </Grid>
          <br />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export default ApiDetail
