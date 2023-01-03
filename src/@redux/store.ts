import { configureStore } from '@reduxjs/toolkit'
import applicationReducer from 'app/pages/MyApp/slice'
import docsSlice from 'app/pages/Document/slice'
import supportReducer from 'app/pages/Support/slices'

import apiSlice from 'app/pages/Api/slice'
// ...

export const store = configureStore({
  reducer: {
    application: applicationReducer,
    dataDocs: docsSlice,
    support: supportReducer,
    apis: apiSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
