import { Collapse, Text } from '@mantine/core'
import React, { useState } from 'react'

function RenderObject({ response }) {
  const [opened, setOpened] = useState('')
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Text size="sm" color="blue">
          Object
        </Text>
        <Text sx={{ marginLeft: '8px' }}>{response.description}</Text>
      </div>
      {'{'}
      {opened === response.resParamId ? (
        ''
      ) : (
        <span
          onClick={() => setOpened(response.resParamId)}
          style={{ cursor: 'pointer' }}
          aria-hidden
        >
          ...
        </span>
      )}
      <Collapse in={opened === response.resParamId} sx={{ marginLeft: '16px' }}>
        {response.subItem.map(sub => (
          <div
            style={{
              display: 'flex',
              cursor: 'pointer'
            }}
            key={sub.subResParamId}
            onClick={() => setOpened('')}
            aria-hidden
          >
            <Text size="xs" color="blue">
              {sub.type}
            </Text>
            <Text sx={{ marginLeft: '8px' }}>{sub.description}</Text>
          </div>
        ))}
      </Collapse>
      {'}'}
    </>
  )
}

export default RenderObject
