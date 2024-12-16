// HEROES FETCH
export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};
// HEROES CREATE
export const heroesCreating = () => {
  return {
    type: "HEROES_CREATING",
  };
};

export const heroesCreated = (hero) => {
  return {
    type: "HEROES_CREATED",
    payload: hero,
  };
};

export const heroesCreatingError = () => {
  return {
    type: "HEROES_CREATING_ERROR",
  };
};
// HEROES DELETE
export const heroesDeleting = () => {
  return {
    type: "HEROES_DELETING",
  };
};

export const heroesDeleted = (id) => {
  return {
    type: "HEROES_DELETED",
    payload: id,
  };
};

export const heroesDeletingError = () => {
  return {
    type: "HEROES_DELETING_ERROR",
  };
};
// HEROES FILTER
export const filtersFetching = () => {
  return {
    type: "FILTERS_FETCHING",
  };
};

export const filtersFetched = (filters) => {
  return {
    type: "FILTERS_FETCHED",
    payload: filters,
  };
};
export const setFilter = (filterIndex) => ({
  type: "SET_FILTER",
  payload: filterIndex,
});
