const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  activeFilterIndex: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // HEROES FETCH
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    // HEROES CREATE
    case "HEROES_CREATING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_CREATED":
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
        heroesLoadingStatus: "idle",
      };
    case "HEROES_CREATING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    // HEROES DELETE
    case "HEROES_DELETING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_DELETED":
      return {
        ...state,
        heroes: state.heroes.filter(({ id }) => id !== action.payload),
        heroesLoadingStatus: "idle",
      };
    case "HEROES_DELETING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    // FILTER
    case "FILTERS_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
        heroesLoadingStatus: "idle",
      };
    case "SET_FILTER":
      return {
        ...state,
        activeFilterIndex: action.payload,
        heroesLoadingStatus: "idle",
      };
    default:
      return state;
  }
};

export default reducer;
