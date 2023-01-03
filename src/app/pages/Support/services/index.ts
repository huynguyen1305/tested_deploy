// import { useState, useEffect } from 'react'
// import axiosClient from 'config/axios/apis-config'
// import { SupportProps } from 'constants/type'
// import axiosClient from 'config/axios/index'
// import { showError, showSuccess } from 'components/Notification'
// import i18n from 'config/locales/config'

import axios from 'axios'

const SupportService = {
  getAll: async param => {
    const { data } = await axios.get('/ticket/get', {
      params: {
        category: 'faq',
        ...param
      }
    })
    return data
  }
}

export default SupportService
