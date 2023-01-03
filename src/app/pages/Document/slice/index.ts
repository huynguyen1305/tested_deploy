/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
// import { RootState } from '@redux/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_DOC } from 'common'
import { ApiResponse } from 'common/type'
import { Docs } from './type'

const initialState: any = {
  loading: false,
  error: null,
  posts: []
}

export const fetchAsyncDocs = createAsyncThunk(
  'Docs/fetchAsyncDocs',
  async (params: any) => {
    const response = await axios.get<ApiResponse<Docs>>(API_DOC, {
      params: params.params,
      signal: params.signal
    })
    return response.data
  }
)
const docsSlice = createSlice({
  name: 'Docs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAsyncDocs.pending, state => {
        state.loading = true
      })
      .addCase(fetchAsyncDocs.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload.data
      })
      .addCase(fetchAsyncDocs.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})
export default docsSlice.reducer
