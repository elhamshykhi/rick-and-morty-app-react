import "./App.css";

import Navbar from "./components/Navbar";
import CharactersList from "./components/CharactersList";
import CharacterDetail from "./components/CharacterDetail";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [query, setQuery] = useState("");
  const { characters, isLoading } = useCharacters(
    "https://rickandmortyapi.com/api/character",
    query
  );
  const [selectedId, setSelectedId] = useState(1);
  const [favorites, setFavorites] = useLocalStorage("FAVORITES", []);

  // select a character and show it in Character detail
  const handleDetail = (id) => {
    setSelectedId(id);
    if (window.innerWidth < "640") {
      setIsShowDetail(true);
    }
  };

  // add a character to favorites
  const handleAddFavorites = (character) => {
    setFavorites((prev) => [...prev, character]);
  };

  // which characters is in favorites
  const addedToFavorites = favorites.map((ch) => ch.id).includes(selectedId);

  // delete a character from favorites
  const handleDeleteFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="">
      <Toaster />
      <Navbar
        query={query}
        favorites={favorites}
        setQuery={setQuery}
        handleDeleteFavorite={handleDeleteFavorite}
      />

      <main className="grid grid-cols-12 lg:mx-auto lg:max-w-screen-lg sm:gap-x-4 p-4 sm:p-5 md:p-6">
        <CharactersList
          characters={characters}
          isLoading={isLoading}
          setIsShowDetail={setIsShowDetail}
          handleDetail={handleDetail}
          selectedId={selectedId}
          favorites={favorites}
        />
        <CharacterDetail
          isShowDetail={isShowDetail}
          setIsShowDetail={setIsShowDetail}
          selectedId={selectedId}
          handleAddFavorites={handleAddFavorites}
          addedToFavorites={addedToFavorites}
        />
      </main>
    </div>
  );
}

export default App;
