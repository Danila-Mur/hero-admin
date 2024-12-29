import {
  heroesFetched,
  heroesFetchError,
  heroesFetching,
} from "../components/heroesList/heroesSlice";
import {
  filtersFetched,
  filtersFetching,
} from "../components/heroesFilters/filtersSlice";

export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchError()));
};

export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request("http://localhost:3001/filters")
    .then((data) => dispatch(filtersFetched(data)))
    .catch(() => console.log("Error fetching filters"));
};
