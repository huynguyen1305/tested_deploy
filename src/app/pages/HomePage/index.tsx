/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-template */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { withTranslation } from 'react-i18next'
import { createStyles, Button } from '@mantine/core'
import { IconCircle } from '@tabler/icons'
import { useNavigate } from 'react-router-dom'
import './home.scss'

const useStyles = createStyles(theme => ({
  side: {
    width: '300px',
    height: '320px',
    padding: '20px',
    background:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.dark[9],
    color: 'white',
    borderRadius: '35px'
  },
  step1Side: {
    margin: '20px 55%'
  },
  iconSide: {
    display: 'flex',
    justifyContent: 'center'
  },
  mainText: {
    width: '600px',
    padding: '10px',
    margin: '-3% 10% 0'
  },
  step2Side: {
    margin: '-5% 75% 0'
  },
  step3Side: {
    margin: '30px 50%'
  },
  h2Content: {
    width: '80%'
  }
}))

export function Landing({ t }) {
  const navigate = useNavigate()
  const { classes } = useStyles()
  return (
    <div>
      <div
        onClick={() => {
          navigate('/docs')
        }}
        className={'side ' + classes.side + ' ' + classes.step1Side}
      >
        <h2>Step1.</h2>
        <h2 className={classes.h2Content}>
          Read the Docs and learn about Nexon's OpenAPI Find out.
        </h2>
        <div className={classes.iconSide}>
          <IconCircle size={40} />
        </div>
      </div>
      <div className={'main_content ' + classes.mainText}>
        <h1>
          Based on numerous data from Nexon games your own service Make it your
          own color.
        </h1>
        <Button
          onClick={() => {
            navigate('/docs')
          }}
          size="md"
        >
          Getting Started
        </Button>
      </div>

      <div
        onClick={() => {
          navigate('/apis')
        }}
        className={'side ' + classes.side + ' ' + classes.step2Side}
      >
        <h2>Step2.</h2>
        <h2 className={classes.h2Content}>
          API function check it out, freely develop it.
        </h2>
        <div className={classes.iconSide}>
          <IconCircle size={40} />
        </div>
      </div>
      <div
        onClick={() => {
          navigate('/forum')
        }}
        className={'side ' + classes.side + ' ' + classes.step3Side}
      >
        <h2>Step3.</h2>
        <h2 className={classes.h2Content}>
          in the forum own service introduce or various opinions Share it.
        </h2>
        <div className={classes.iconSide}>
          <IconCircle size={40} />
        </div>
      </div>
    </div>
  )
}

export default withTranslation()(Landing)
