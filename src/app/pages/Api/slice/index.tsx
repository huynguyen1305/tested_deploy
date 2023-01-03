// import { RootState } from '@redux/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { IApiHandler, ApiResponse, RequestParams } from 'common/type'
import { IGameSelected, ITabNameSelected, IApiDetail } from './type'

interface IApiState extends IApiHandler {
  loading: boolean
  error: any
  gameList: IGameSelected[]
  gameNameList: string[]
  gameSelected: IGameSelected
  tabNameSelected: ITabNameSelected
  apiList: IApiDetail[]
  apiDetail: IApiDetail
}

export const initialState: IApiState = {
  loading: false,
  error: null,
  gameList: [],
  gameNameList: [],
  gameSelected: {
    gameId: '',
    gameName: '',
    isPublish: false,
    tabNameList: [],
    updatedAt: new Date(),
    updatedBy: '',
    createdAt: new Date(),
    createdBy: ''
  },
  tabNameSelected: {
    tabName: '',
    category2List: []
  },
  apiList: [],
  apiDetail: {
    apiDescription: '',
    apiId: '',
    apiMethod: '',
    apiName: '',
    category2: '',
    createdAt: new Date(),
    createdBy: '',
    deprecated: { isDeprecated: false, deprecatedDate: '' },
    gameName: '',
    isPublish: false,
    path: '',
    requestParams: [
      {
        paramId: '',
        keyLabel: '',
        description: '',
        isRequired: false,
        type: ''
      }
    ],
    responseCode: [
      {
        paramId: '',
        keyLabel: '',
        description: '',
        type: ''
      }
    ],
    responseParams: [
      {
        resParamId: '',
        keyLabel: '',
        description: '',
        type: '',
        subItem: [
          {
            keyLabel: '',
            description: '',
            subResParamId: '',
            type: ''
          }
        ]
      }
    ],
    tabName: '',
    updatedAt: new Date()
  }
}

export const getGameList = createAsyncThunk(
  'apis/getGameList',
  async (
    config: {
      params: RequestParams
      signal: AbortSignal
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.get<ApiResponse<IGameSelected>>(
        `/game/get`,
        {
          params: config.params,
          signal: config.signal
        }
      )
      return response.data
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
    }
  }
)
export const getApiList = createAsyncThunk(
  'apis/getApiList',
  async (
    config: {
      params: {
        page: number
        limit: number
        gameName: string
      }
      signal: AbortSignal
    },
    thunkAPI
  ) => {
    try {
      const response = await axios.get<IApiDetail>(`/api/get`, {
        params: config.params,
        signal: config.signal
      })

      return response.data
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
    }
  }
)

const apiSlice = createSlice({
  name: 'apis',
  initialState,
  reducers: {
    setGameSelected: (state, action) => {
      const gameSelected =
        state.gameList.find(
          (item: IGameSelected) => item.gameName === action.payload
        ) || initialState.gameSelected
      return {
        ...state,
        gameSelected,
        tabNameSelected: gameSelected.tabNameList[0]
      }
    },
    setTabNameSelected: (state, action) => ({
      ...state,
      tabNameSelected: action.payload
    })
  },
  extraReducers: {
    [getGameList.pending.toString()]: state => ({
      ...state,
      loading: true
    }),
    [getGameList.fulfilled.toString()]: (state, actions) => {
      const gameNameList = actions.payload.data.map(
        (item: IGameSelected) => item.gameName
      )
      if (gameNameList.length > 0) {
        const gameSelected = actions.payload.data[0]
        const tabNameSelected = gameSelected.tabNameList[0]

        return {
          ...state,
          loading: false,
          gameList: actions.payload.data,
          gameNameList,
          gameSelected,
          tabNameSelected,
          error: null
        }
      }
      return {
        ...state,
        loading: false,
        gameList: actions.payload.data,
        error: null
      }
    },
    [getGameList.rejected.toString()]: (state, actions) => ({
      ...state,
      loading: false,
      error: actions.payload
    }),
    [getApiList.pending.toString()]: state => ({
      ...state,
      loading: true
    }),
    [getApiList.fulfilled.toString()]: (state, actions) => ({
      ...state,
      loading: false,
      apiList: actions.payload.data,
      error: null
    }),
    [getApiList.rejected.toString()]: (state, actions) => ({
      ...state,
      loading: false,
      error: actions.payload
    })
  }
})

export const { setGameSelected, setTabNameSelected } = apiSlice.actions

export default apiSlice.reducer
