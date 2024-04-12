import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../../store';

// Define a type for the slice state
interface ChartOneState {
  series: {
    name: string;
    data: number[];
    color?: string;
  }[];
}

// Define the initial state using that type
const initialState: ChartOneState = {
  series: [
    {
      name: '',
      data: [],
      // color: '',
    },
    {
      name: '',
      data: [],
    },
  ],
};

export const chartSeriesSlice = createSlice({
  name: 'chartSeries',
  initialState,
  reducers: {
    updateSeries: (state: ChartOneState, action: PayloadAction<{ index: number; name: string; data: number[]; color?: string }>) => {
        const {index, name, data, color} = action.payload;
        state.series[index] = {name, data, color};
    }
  },
});

export const { updateSeries } = chartSeriesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default chartSeriesSlice.reducer;
