/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Badge, Box, Center, Tooltip, UnstyledButton } from '@mantine/core'
import { IconLoader, IconReload } from '@tabler/icons'
import React, { useState } from 'react'

interface Props {
  status: 'normal' | 'error'
  action: () => Promise<any>
}

/**
 * This component add loading state, and a callback action to mantine badge,
 * original component: import { Badge } from '@mantine/core'
 * @returns {React.ReactElement}
 */
export default function LoadingBadge({ status, action }: Props) {
  const [loading, setLoading] = useState(false)

  if (status === 'normal') {
    return (
      <Badge
        size="lg"
        styles={_theme => ({
          inner: {
            textTransform: 'none'
          }
        })}
        color="green"
        onClick={action}
      >
        Normal
      </Badge>
    )
  }

  const handleAction = async () => {
    setLoading(true)
    action().finally(() => setLoading(false))
  }

  return (
    <Tooltip label="Click to renew">
      <Box onClick={handleAction} className="cursor-pointer">
        <Badge
          size="lg"
          color="red"
          styles={_theme => ({
            inner: {
              textTransform: 'none'
            }
          })}
        >
          {/* <UnstyledButton onClick={handleAction}> */}
          <Center className="gap-1 cursor-pointer">
            {loading ? (
              <IconReload
                size="14px"
                className={`${loading ? 'animate-spin' : ''}`}
              />
            ) : (
              <IconReload size="14px" />
            )}
            Error
          </Center>
          {/* </UnstyledButton> */}
        </Badge>
      </Box>
    </Tooltip>
  )
}
