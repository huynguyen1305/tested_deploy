/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { faker } from '@faker-js/faker'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Application, AppType } from 'domain/application'
import fakeNetwork from 'utils/fakeNetwork'
import { RequiredField } from 'utils/type'
import { RootState } from '@redux/store'
import ApplicationState from './type'

// mock data
const a = [
  {
    accountId: '6357a4aa594b4a02b77e054c',
    type: 'develop' as AppType,
    name: 'Yundt Inc',
    url: undefined,
    description: undefined,
    imageUrl: undefined,
    gameName: 'Kart rider',
    gameId: '634516ce84b8bd8a12965359',
    id: '6357a4aa594b4a02b77e0550',
    token: {
      id: '6358993fff5fdaf62646b7dd',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU3YTRhYTU5NGI0YTAyYjc3ZTA1NGMiLCJpYXQiOjE2NjY3NTA3ODMsImV4cCI6MTY2Njc1MDc4M30.TKh0UYDIuXNahdQJ6B1zPtX3O1zUwRjOKxjglUVIIJQ',
      blacklisted: false,
      expiredAt: '2022-10-26T02:19:43.173Z',
      createdAt: '2022-10-26T02:19:43.180Z'
    }
  },
  {
    accountId: '6357a4aa594b4a02b77e054c',
    type: 'develop' as AppType,
    name: 'McGlynn - Yost',
    url: undefined,
    description: undefined,
    imageUrl: 'https://loremflickr.com/640/480',
    gameName: 'Kart rider',
    gameId: '634516ce84b8bd8a12965359',
    id: '6357a4aa594b4a02b77e0551',
    token: {
      id: '6358993fff5fdaf62646b7dd',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU3YTRhYTU5NGI0YTAyYjc3ZTA1NGMiLCJpYXQiOjE2NjY3NTA3ODMsImV4cCI6MTY2Njc1MDc4M30.TKh0UYDIuXNahdQJ6B1zPtX3O1zUwRjOKxjglUVIIJQ',
      blacklisted: false,
      expiredAt: '2022-10-26T02:19:43.173Z',
      createdAt: '2022-10-26T02:19:43.180Z'
    }
  },
  {
    accountId: '6357a4aa594b4a02b77e054c',
    type: 'service' as AppType,

    name: 'Padberg, Feil and Walker',
    url: 'http://sane-client.biz',
    description:
      'In ad doloremque amet. Ratione nesciunt cupiditate hic necessitatibus quod eveniet. Libero cumque earum aut quas non error neque.',
    imageUrl: 'https://loremflickr.com/640/480',
    gameName: 'Maple story',
    gameId: '6357b2593ac14976bbcd043e',
    id: '6357a4aa594b4a02b77e0552',
    token: {
      id: '6358993fff5fdaf62646b7dd',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU3YTRhYTU5NGI0YTAyYjc3ZTA1NGMiLCJpYXQiOjE2NjY3NTA3ODMsImV4cCI6MTY2Njc1MDc4M30.TKh0UYDIuXNahdQJ6B1zPtX3O1zUwRjOKxjglUVIIJQ',
      blacklisted: false,
      expiredAt: '2022-10-26T02:19:43.173Z',
      createdAt: '2022-10-26T02:19:43.180Z'
    }
  },
  {
    accountId: '6357a4aa594b4a02b77e054c',
    type: 'service' as AppType,
    name: 'Sawayn - Flatley',
    url: 'http://scarce-tram.org',
    description:
      'Repudiandae a mollitia a atque vel nam labore magnam culpa. Iusto ipsum sunt id porro. Ratione rerum iure. Placeat alias necessitatibus maxime earum nobis.',
    imageUrl: 'https://loremflickr.com/640/480',
    gameName: 'Maple story',
    gameId: '6357b2593ac14976bbcd043e',
    id: '6357a4aa594b4a02b77e0553',
    token: {
      id: '6358993fff5fdaf62646b7dd',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU3YTRhYTU5NGI0YTAyYjc3ZTA1NGMiLCJpYXQiOjE2NjY3NTA3ODMsImV4cCI6MTY2Njc1MDc4M30.TKh0UYDIuXNahdQJ6B1zPtX3O1zUwRjOKxjglUVIIJQ',
      blacklisted: false,
      expiredAt: '2022-10-26T02:19:43.173Z',
      createdAt: '2022-10-26T02:19:43.180Z'
    }
  },
  {
    accountId: '6357a4aa594b4a02b77e054c',
    type: 'develop' as AppType,
    name: 'suppervisor',
    imageUrl: undefined,
    token: {
      id: '6358993fff5fdaf62646b7dd',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzU3YTRhYTU5NGI0YTAyYjc3ZTA1NGMiLCJpYXQiOjE2NjY3NTA3ODMsImV4cCI6MTY2Njc1MDc4M30.TKh0UYDIuXNahdQJ6B1zPtX3O1zUwRjOKxjglUVIIJQ',
      blacklisted: false,
      expiredAt: '2022-10-26T02:19:43.173Z',
      createdAt: '2022-10-26T02:19:43.180Z'
    },
    gameName: 'Maple story',
    gameId: '6357b2593ac14976bbcd043e',
    id: '6358993fff5fdaf62646b7df'
  }
]

const gSelections = [
  {
    label: 'Kart rider',
    value: '634516ce84b8bd8a12965359'
  },
  {
    label: 'Maple story',
    value: '6357b2593ac14976bbcd043e'
  },
  {
    label: 'FiFa Online 4',
    value: '6357b2593ac14976bbcd038e'
  }
]
// end mock data

type PartialApplication = Partial<Application>

let mockState = [] as Application[]
;(() => {
  const dd = localStorage.getItem('applications')
  if (dd) {
    mockState = JSON.parse(dd) as Application[]
  } else {
    localStorage.setItem('applications', JSON.stringify(a))
    mockState = [...a]
  }
})()

export const initialState: ApplicationState = {
  loading: false,
  data: mockState
}

export const getMyApps = createAsyncThunk(
  'application/getMyApps',
  async (_, { dispatch }) => {
    dispatch(setLoading(true))
    const data = await fakeNetwork(
      JSON.parse(
        // eslint-disable-next-line no-undef
        localStorage.getItem('applications') || Array<Application>().toString()
      ) as Application[]
    )
    dispatch(setLoading(false))
    return data
  }
)

export const getAppDetail = createAsyncThunk(
  'application/getAppDetail',
  async (id: string, { getState }) => {
    const appState = (getState() as RootState).application.data
    const detail = appState.find(app => app.id === id)
    return detail!
  }
)

export const updateApp = createAsyncThunk(
  'application/updateApp',
  async (
    updates: RequiredField<
      Omit<PartialApplication, 'token' | 'gameName' | 'accountId'>,
      'id'
    >,
    { dispatch, getState }
  ) => {
    // apply updates to mock state
    let response
    try {
      const copiedState = (getState() as RootState).application.data.slice()

      const index = copiedState.findIndex(app => app.id === updates.id)
      copiedState[index] = { ...copiedState[index], ...updates }
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      dispatch(set(copiedState))
      response = await fakeNetwork({ ...copiedState[index], ...updates })
    } catch (error) {
      console.error(error)
    }

    return response!
  }
)

export const createApp = createAsyncThunk(
  'application/createApp',
  async (
    app: Pick<
      Application,
      'name' | 'description' | 'gameId' | 'type' | 'imageUrl' | 'url'
    >,
    { dispatch }
  ) => {
    const gameN = gSelections.find(g => g.value === app.gameId)?.label

    const fakeApp: Application = {
      ...app,
      gameName: gameN!,
      id: faker.database.mongodbObjectId(),
      accountId: faker.database.mongodbObjectId(),
      token: {
        id: faker.database.mongodbObjectId(),
        token: faker.random.alphaNumeric(172),
        blacklisted: false,
        expiredAt: faker.date.future().toString(),
        createdAt: faker.date.past().toString()
      }
    }
    // const { gameId, ...rest } = app
    // const response = await axios.post('application', {
    //   ...rest,
    //   game: gameId
    // })
    // return response.data
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dispatch(set(mockState.concat(fakeApp)))

    return fakeApp
  }
)

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    // use for mock only
    set: (state, action: PayloadAction<Application[]>) => {
      localStorage.setItem('applications', JSON.stringify(action.payload))
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getMyApps.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getMyApps.pending, state => {
        state.loading = true
      })
      .addCase(getAppDetail.fulfilled, (state, action) => {
        state.loading = false
        const copied = [...state.data]
        if (copied.length > 0) {
          const index = copied.findIndex(item => item.id === action.payload?.id)
          copied[index] = action.payload
          state.data = copied
        } else {
          state.data = [action.payload]
        }
      })
      .addCase(getAppDetail.pending, state => {
        state.loading = true
      })
      .addCase(updateApp.fulfilled, (state, action) => {
        state.loading = false
        const copied = [...state.data]
        if (copied.length > 0) {
          const index = copied.findIndex(item => item.id === action.payload.id)
          copied[index] = Object.assign(copied[index], action.payload)
          state.data = copied
        }
      })
      .addCase(updateApp.pending, state => {
        state.loading = true
      })
      .addCase(createApp.fulfilled, (state, action) => {
        state.loading = false
        state.data = [...state.data, action.payload]
      })
      .addCase(createApp.pending, state => {
        state.loading = true
      })
  }
})

export const { set, setLoading } = applicationSlice.actions

export default applicationSlice.reducer
