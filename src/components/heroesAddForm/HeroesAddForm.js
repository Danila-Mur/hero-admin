import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";
import toast from "react-hot-toast";
import {
  heroesCreated,
  heroesCreateError,
  heroesCreating,
} from "../heroesList/heroesSlice";

export const HeroesAddForm = () => {
  const [elements, setElements] = useState([]);
  const dispatch = useDispatch();
  const { request } = useHttp();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      element: "",
    },
  });

  React.useEffect(() => {
    request("http://localhost:3001/elementsList")
      .then((data) => setElements(data))
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = async (data) => {
    const heroData = { ...data, id: uuidv4() };

    dispatch(heroesCreating());
    try {
      const response = await request(
        "http://localhost:3001/heroes",
        "POST",
        JSON.stringify(heroData),
      );

      dispatch(heroesCreated(response));
      reset();
      toast.success("Герой успешно добавлен!");
    } catch (e) {
      dispatch(heroesCreateError());
      toast.error("Произошла ошибка при создании!");
      console.error(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border p-4 shadow-lg rounded"
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
          {...register("name", {
            required: true,
            minLength: {
              value: 5,
              message: "error message [NAME]",
            },
          })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          name="description"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
          {...register("description", {
            required: true,
            minLength: {
              value: 5,
              message: "error message [DESCRIPTION]",
            },
          })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          {...register("element", { required: "error message [CATEGORY]" })}
          className="form-select"
          id="element"
          name="element"
        >
          <option>Я владею элементом...</option>
          {elements.map((element) => (
            <option key={element.value} value={element.value}>
              {element.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};
