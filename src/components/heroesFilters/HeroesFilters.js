import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFilters } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import classNames from "classnames";
import toast from "react-hot-toast";
import { heroesFetched } from "../heroesList/heroesSlice";
import { setFilter } from "./filtersSlice";

export const HeroesFilters = () => {
  const { filters, activeFilterIndex } = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchFilters(request));
  }, []);

  const onSelectFilter = (filter) => {
    if (filter.element === "all") {
      dispatch(setFilter(filter.id));
    }

    request(
      `http://localhost:3001/heroes/${filter.element === "all" ? "" : `?element=${filter.element}`}`,
    )
      .then((data) => {
        dispatch(heroesFetched(data));
        dispatch(setFilter(filter.id));
        toast.success(`Выбран герой с элементом '${filter.name}'!`);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                onSelectFilter(filter);
              }}
              className={classNames("btn", {
                [`${filter.className}`]: true,
                active: filter.id === activeFilterIndex,
              })}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
