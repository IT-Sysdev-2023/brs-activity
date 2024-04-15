import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../../store';

// Define a type for the slice state
interface OnlineUsersType {
  onlineUsers:  [{
    id: number,
    name: string,
    ip: string[] | null,
    logged_in_at: string
    image:string
    details: {[key:string]: any} | null
    timestamp: number
}
  ]
}
// Define the initial state using that type
const initialState: OnlineUsersType = {
  onlineUsers: [{
    id: 0,
    name: '',
    ip: null,
    logged_in_at: "",
    image: "",
    details: null,
    timestamp: 0
}
  ]
};

export const onlineUsersSlice = createSlice({
  name: 'onlineUsers',
  initialState,
  reducers: {
    setOnlineUser: (state, action) => {
      state.onlineUsers =  action.payload; // to set the data passed from component
    },

    addOnlineUser: (state, action) => {
      if(!state.onlineUsers.some(item => item.id === action.payload.id)){
        state.onlineUsers.push(action.payload);
      }
    },

    removeOnlineUser: (state, action) => {
      state.onlineUsers = state.onlineUsers.filter(onlineUser => onlineUser.id !== action.payload.id)  as OnlineUsersType['onlineUsers']
    }
  },
});

export const { setOnlineUser, addOnlineUser, removeOnlineUser } = onlineUsersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default onlineUsersSlice.reducer;
