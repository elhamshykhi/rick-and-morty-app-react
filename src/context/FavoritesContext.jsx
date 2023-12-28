import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {
  const [isShowDetail, setIsShowDetail] = useState(false);
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
    <FavoritesContext.Provider
      value={{
        favorites,
        selectedId,
        handleDetail,
        handleAddFavorites,
        addedToFavorites,
        handleDeleteFavorite,
        isShowDetail,
        setIsShowDetail,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
