import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    //fetch
    heroesFetching: (state) => {
      state.heroesLoadingStatus = "loading";
    },
    heroesFetched: (state, action) => {
      state.heroesLoadingStatus = "idle";
      state.heroes = action.payload;
    },
    heroesFetchError: (state) => {
      state.heroesLoadingStatus = "error";
    },
    //create
    heroesCreating: (state) => {
      state.heroesLoadingStatus = "loading";
    },
    heroesCreated: (state, action) => {
      state.heroesLoadingStatus = "idle";
      state.heroes.push(action.payload);
    },
    heroesCreateError: (state) => {
      state.heroesLoadingStatus = "error";
    },
    //delete
    heroesDeleting: (state) => {
      state.heroesLoadingStatus = "loading";
    },
    heroesDeleted: (state, action) => {
      state.heroesLoadingStatus = "idle";
      state.heroes = state.heroes.filter(({ id }) => id !== action.payload);
    },
    heroesDeleteError: (state) => {
      state.heroesLoadingStatus = "error";
    },
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const {
  heroesFetching,
  heroesFetched,
  heroesFetchError,
  heroesCreating,
  heroesCreated,
  heroesCreateError,
  heroesDeleting,
  heroesDeleted,
  heroesDeletedError,
} = actions;
