/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
// import { RootState } from '@redux/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { initialPagination } from 'common'
import { IApiHandler, ApiResponse, RequestParams } from 'common/type'
import { FAQType, NoticeType, SupportDocsType } from './type'

interface FAQ extends IApiHandler {
  FAQList: ApiResponse<FAQType>
  FAQDetails: any
}

interface INotice extends IApiHandler {
  noticeList: ApiResponse<NoticeType>
  noticeDetails: any
}

interface ISupportDocs extends IApiHandler {
  supportDocList: ApiResponse<SupportDocsType>
  supportDocDetail: any
}

const initialState: FAQ & INotice & ISupportDocs = {
  loading: false,
  error: null,
  noticeList: {
    data: [
      {
        title: '',
        updatedAt: new Date().toString()
      }
    ],
    extra: initialPagination,
    status: 0,
    statusText: ''
  },
  noticeDetails: '',
  FAQList: {
    data: [
      {
        title: '',
        updatedAt: new Date().toString()
      }
    ],
    extra: initialPagination,
    status: 0,
    statusText: ''
  },
  FAQDetails: {}, // remember to add type for detail when implement it
  supportDocList: {
    data: [
      {
        _id: '',
        tabName: ''
      }
    ],
    extra: initialPagination,
    status: 0,
    statusText: ''
  },
  supportDocDetail: ''
}

export const fetchAsyncFAQ = createAsyncThunk(
  'FAQ/fetchAsyncFAQ',
  async (params?: RequestParams) => {
    const response = await axios.get<ApiResponse<FAQType>>(`/ticket/get`, {
      params: {
        filter: 'faq',
        ...params
      }
    })
    return response.data
  }
)

export const fetchAsyncFAQDetail = createAsyncThunk(
  'FAQ/fetchAsyncFAQDetail',
  async (id: string | undefined) => {
    const response = await axios.get(`/ticket/get/${id}`)
    return response.data
  }
)

export const fetchAsyncNotices = createAsyncThunk(
  'notice/fetchAsyncNotices',
  async (params: RequestParams) => {
    const { data } = await axios.get<ApiResponse<NoticeType>>(`/ticket/get`, {
      params: {
        filter: 'notice',
        ...params
      }
    })

    return data
  }
)

export const fetchAsyncNoticeDetails = createAsyncThunk(
  'docs/fetchAsyncnoticeDetails',
  async (id: string | undefined) => {
    const response = await axios.get(`/ticket/get/${id}`)

    return response.data
  }
)

export const fetchAsyncSupportDocs = createAsyncThunk(
  'docs/fetchAsyncSupportDocs',
  async () => {
    const response = await axios.get(`/post/get/`, {
      params: {
        search: 'support'
      }
    })

    return response.data
  }
)
export const fetchAsyncSupportDocsDetail = createAsyncThunk(
  'notice/fetchAsyncSupportDocsDetail',
  async (id: any) => {
    const response = await axios.get(`/post/get/${id}`)

    return response.data
  }
)

const SupportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    removeSelectedFAQ: state => {
      state.FAQDetails = initialState.FAQDetails
    },
    removeSelectedNotice: state => {
      state.noticeDetails = initialState.noticeList
    }
  },
  extraReducers: {
    [fetchAsyncFAQ.pending.toString()]: state => {
      state.loading = true
    },
    [fetchAsyncFAQ.fulfilled.toString()]: (state, { payload }) => ({
      ...state,
      loading: false,
      FAQList: payload
    }),
    [fetchAsyncFAQ.rejected.toString()]: (state, { payload }) => ({
      ...state,
      FAQList: initialState.FAQList,
      error: payload,
      loading: false
    }),
    [fetchAsyncFAQDetail.pending.toString()]: state => {
      state.loading = true
    },
    [fetchAsyncFAQDetail.fulfilled.toString()]: (state, { payload }) => ({
      ...state,
      loading: false,
      FAQDetails: payload
    }),
    [fetchAsyncFAQDetail.rejected.toString()]: (state, { payload }) => ({
      ...state,
      FAQDetails: initialState.noticeList,
      error: payload,
      loading: false
    }),
    [fetchAsyncSupportDocs.pending.toString()]: state => {
      state.loading = true
    },
    [fetchAsyncSupportDocs.fulfilled.toString()]: (state, { payload }) => {
      console.log(payload)
      return {
        ...state,
        loading: false,
        supportDocList: payload
      }
    },
    [fetchAsyncSupportDocs.rejected.toString()]: (state, { payload }) => {
      console.log(payload)
      return {
        ...state,
        supportDocList: initialState.supportDocList,
        error: payload,
        loading: false
      }
    },
    [fetchAsyncSupportDocsDetail.pending.toString()]: state => {
      state.loading = true
    },
    [fetchAsyncSupportDocsDetail.fulfilled.toString()]: (
      state,
      { payload }
    ) => ({
      ...state,
      loading: false,
      supportDocDetail: payload
    }),
    [fetchAsyncSupportDocsDetail.rejected.toString()]: (
      state,
      { payload }
    ) => ({
      ...state,
      supportDocDetail: initialState.supportDocDetail,
      error: payload,
      loading: false
    }),
    [fetchAsyncNotices.pending.toString()]: state => {
      state.loading = true
    },
    [fetchAsyncNotices.fulfilled.toString()]: (state, { payload }) => ({
      ...state,
      loading: false,
      noticeList: payload
    }),
    [fetchAsyncNotices.rejected.toString()]: (state, { payload }) => ({
      ...state,
      noticeList: initialState.noticeList,
      error: payload,
      loading: false
    }),
    [fetchAsyncNoticeDetails.pending.toString()]: state => {
      state.loading = true
    },
    [fetchAsyncNoticeDetails.fulfilled.toString()]: (state, { payload }) => ({
      ...state,
      loading: false,
      noticeDetails: payload
    }),
    [fetchAsyncNoticeDetails.rejected.toString()]: (state, { payload }) => ({
      ...state,
      noticeDetails: initialState.noticeList,
      error: payload,
      loading: false
    })
  }
})

export const { removeSelectedFAQ } = SupportSlice.actions

export default SupportSlice.reducer
