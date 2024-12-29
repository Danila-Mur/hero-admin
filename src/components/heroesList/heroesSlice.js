import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

export const fetchHeroes = createAsyncThunk("heroes/fetchHeroes", async () => {
  const { request } = useHttp();

  return await request("http://localhost:3001/heroes");
});

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroesFetchedWithFilter: (state, action) => {
      state.heroesLoadingStatus = "idle";
      state.heroes = action.payload;
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const {
  heroesCreating,
  heroesCreated,
  heroesCreateError,
  heroesDeleting,
  heroesDeleted,
  heroesDeletedError,
  heroesFetchedWithFilter,
} = actions;
