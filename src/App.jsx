import "./App.css";

import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";

import CharactersList from "./components/CharactersList";
import CharacterDetail from "./components/CharacterDetail";

import CharactersProvider from "./context/CharactersContext";
import FavoritesProvider from "./context/FavoritesContext";

function App() {
  return (
    <CharactersProvider>
      <FavoritesProvider>
        <Toaster />
        <Navbar />
        <main className="grid grid-cols-12 lg:mx-auto lg:max-w-screen-lg sm:gap-x-4 p-4 sm:p-5 md:p-6">
          <CharactersList />
          <CharacterDetail />
        </main>
      </FavoritesProvider>
    </CharactersProvider>
  );
}

export default App;
