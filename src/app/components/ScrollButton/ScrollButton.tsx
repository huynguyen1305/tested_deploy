/* eslint-disable no-undef */
import { useState } from 'react'
import { IconArrowBigUpLine } from '@tabler/icons'
import { Button } from '@mantine/core'

import './ScrollButton.scss'

function ScrollButton() {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop

    if (scrolled > 100) {
      setVisible(true)
    } else if (scrolled <= 100) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  window.addEventListener('scroll', toggleVisible)

  return (
    <Button
      onClick={scrollToTop}
      className="button-container"
      style={{ display: visible ? 'inline' : 'none' }}
    >
      <IconArrowBigUpLine />
    </Button>
  )
}

export default ScrollButton
