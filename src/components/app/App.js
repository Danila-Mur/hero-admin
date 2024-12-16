import { Toaster } from "react-hot-toast";
import { HeroesAddForm } from "../heroesAddForm/HeroesAddForm";
import { HeroesList } from "../heroesList/HeroesList";
import { HeroesFilters } from "../heroesFilters/HeroesFilters";

import "./app.scss";

const App = () => {
  return (
    <main className="app">
      <div className="content">
        <HeroesList />
        <div className="content__interactive">
          <HeroesAddForm />
          <HeroesFilters />
        </div>
      </div>
      <Toaster />
    </main>
  );
};

export default App;
