import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  filtersLoadingStatus: "idle",
  filters: [],
  activeFilter: 0,
};

export const fetchFilters = createAsyncThunk(
  "heroes/fetchFilters",
  async () => {
    const { request } = useHttp();

    return await request("http://localhost:3001/filters");
  },
);

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.activeFilterIndex = action.payload;
      state.filtersLoadingStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filtersLoadingStatus = "idle";
        state.filters = action.payload;
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { filtersFetching, filtersFetched, setFilter } = actions;
