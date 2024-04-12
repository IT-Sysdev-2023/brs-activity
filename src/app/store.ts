import { configureStore } from '@reduxjs/toolkit'
import chartSeriesReducer from './features/charts/ChartSeriesSlice'
import onlineUsersReducer from './features/OnlineUsers'
// ...

const store = configureStore({
  reducer: {
    chartSeries: chartSeriesReducer,
    onlineUsers: onlineUsersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;