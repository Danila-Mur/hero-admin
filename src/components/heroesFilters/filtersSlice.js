import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filtersLoadingStatus: "idle",
  filters: [],
  activeFilterIndex: 0,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filtersFetching: (state) => {
      state.filtersLoadingStatus = "loading";
    },
    filtersFetched: (state, action) => {
      state.filtersLoadingStatus = "idle";
      state.filters = action.payload;
    },
    setFilter: (state, action) => {
      state.activeFilterIndex = action.payload;
      state.filtersLoadingStatus = "idle";
    },
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { filtersFetching, filtersFetched, setFilter } = actions;
