import { LoadingOverlay } from '@mantine/core'

function Spinner() {
  return (
    <LoadingOverlay
      loaderProps={{ size: 'lg', color: 'blue', variant: 'oval' }}
      overlayOpacity={0.5}
      overlayBlur={1}
      visible
    />
  )
}

export default Spinner
