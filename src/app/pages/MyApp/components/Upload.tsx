/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Checkbox,
  Group,
  Text,
  useMantineTheme,
  createStyles,
  Image,
  Button,
  Space
} from '@mantine/core'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons'
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { APPLICATION_MODIFY } from 'common'
import { MAX_FILE_SIZE } from 'common/string'

const useStyles = createStyles(theme => ({
  disabled: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
    cursor: 'not-allowed',

    '& *': {
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[5]
    }
  }
}))

interface ImageUploadProps extends Omit<DropzoneProps, 'children'> {
  imageSrc?: string
  setImage: (src: File | '') => void
}
export default function ImageUpload({ imageSrc, ...props }: ImageUploadProps) {
  const theme = useMantineTheme()
  const { classes } = useStyles()
  const { setImage: setImageSrc, ...dropzoneProps } = props

  const location = useLocation()
  const modifying = location.pathname.includes(APPLICATION_MODIFY)

  return (
    <div className="relative">
      <div
        className="h-full absolute inset-0 z-20 cursor-not-allowed "
        onDrop={e => e.preventDefault()}
        style={{
          display: props.disabled ? 'block' : 'none'
        }}
      />

      <Dropzone
        className={props.disabled ? classes.disabled : ''}
        preventDropOnDocument
        onReject={rejectedFiles => {
          console.log('rejected files', rejectedFiles)
          // eslint-disable-next-line no-alert, no-undef
          alert('File size is too large')
        }}
        maxSize={MAX_FILE_SIZE}
        accept={IMAGE_MIME_TYPE}
        multiple={false}
        maxFiles={1}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...dropzoneProps}
      >
        {imageSrc && !props.disabled ? (
          <Image
            styles={themeObj => ({
              placeholder: {
                backgroundColor:
                  themeObj.colorScheme === 'dark'
                    ? themeObj.colors.dark[6]
                    : themeObj.colors.gray[2]
              }
            })}
            radius="md"
            src={imageSrc}
            width={200}
            height={200}
            alt="Application image"
            imageProps={{
              onLoad: () => {
                if (!modifying) {
                  URL.revokeObjectURL(imageSrc)
                }
              }
            }}
          />
        ) : (
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 220, pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <IconUpload
                size={50}
                stroke={1.5}
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === 'dark' ? 4 : 6
                  ]
                }
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={50}
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size={50} stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Upload an icon for your application, file should not exceed{' '}
                {Math.floor(MAX_FILE_SIZE / 1024 ** 2)}mb
              </Text>
            </div>
          </Group>
        )}
      </Dropzone>

      <Space h="sm" />
      {imageSrc && !props.disabled && (
        <Button
          onClick={() => {
            setImageSrc('')
          }}
        >
          Remove image
        </Button>
      )}
    </div>
  )
}

ImageUpload.defaultProps = {
  imageSrc: undefined
}
