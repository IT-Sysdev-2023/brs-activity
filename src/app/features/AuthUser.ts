import { createSlice } from '@reduxjs/toolkit';
// import type { RootState } from '../../store';

interface authUserTypes {
  id: number;
  name: string;
  roles: {[key:string]: any};
}

const initialState: authUserTypes = {
  id: 0,
  name: '',
  roles: [],
};

const hasRole = (roles: string[]) => { //r'fr'b2rf'r'b2r2
  return initialState.roles.some((item: any) => item.name.includes(roles));
}

export const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    setAuthRecord: (_, action) => {
      return action.payload;
    },

    hasRole: (_ ,action) => {
     return hasRole(action.payload);
    }


  },
});

export const { setAuthRecord } = authUserSlice.actions;

export default authUserSlice.reducer;
