import { createSlice } from '@reduxjs/toolkit';
// import type { RootState } from '../../store';

interface authUserTypes {
  id: number;
  name: string;
  roles: any[];
}

const initialState: authUserTypes = {
  id: 0,
  name: '',
  roles: [],
};

export const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthRecord: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAuthRecord } = authUserSlice.actions;

export default authUserSlice.reducer;
