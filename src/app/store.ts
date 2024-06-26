import { configureStore } from '@reduxjs/toolkit'
import chartSeriesReducer from './features/charts/ChartSeriesSlice'
import onlineUsersReducer from './features/OnlineUsers'
import authUserReducer from './features/AuthUser'
// ...

const store = configureStore({
  reducer: {
    chartSeries: chartSeriesReducer,
    onlineUsers: onlineUsersReducer,
    authUser: authUserReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;