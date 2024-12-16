//++
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  filtersFetched,
  filtersFetching,
  heroesFetched,
  heroesFetchingError,
  setFilter,
} from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import classNames from "classnames";
import toast from "react-hot-toast";

export const HeroesFilters = () => {
  const { filters, activeFilterIndex } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
      .then((data) => dispatch(filtersFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));
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

  // onCLickFilter;
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
