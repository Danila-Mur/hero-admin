import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  heroesDeleted,
  heroesDeleting,
  heroesDeletingError,
  heroesFetched,
  heroesFetching,
  heroesFetchingError,
} from "../../actions";
import toast from "react-hot-toast";
import { HeroesListItem } from "../heroesListItem/HeroesListItem";
import { Spinner } from "../spinner/Spinner";

// ++
// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

export const HeroesList = () => {
  const { heroes, heroesLoadingStatus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
      .then((data) => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  const onDeleteHandle = (id) => {
    dispatch(heroesDeleting());

    try {
      request(
        `http://localhost:3001/heroes/${id}`,
        "DELETE",
        JSON.stringify({ id }),
      )
        .then(() => {
          dispatch(heroesDeleted(id));
          toast.success("Герой успешно удален!", {
            icon: "👏",
          });
        })
        .catch(() => {
          dispatch(heroesDeletingError());
          toast.error("Произошла ошибка при удалении!");
        });
    } catch (e) {
      dispatch(heroesDeletingError());
      toast.error("Произошла ошибка при удалении!");
      console.error(e);
    }
  };

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ ...props }) => {
      return (
        <HeroesListItem
          key={props.id}
          {...props}
          onDeleteHandle={onDeleteHandle}
        />
      );
    });
  };

  const elements = renderHeroesList(heroes);
  return <ul>{elements}</ul>;
};
