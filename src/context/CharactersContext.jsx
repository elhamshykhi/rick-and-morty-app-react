import { createContext, useContext, useState } from "react";
import useFetchCharacters from "../hooks/useCharacters";

const CharactersContext = createContext();

export default function CharactersProvider({ children }) {
  const [query, setQuery] = useState("");
  const { characters, isLoading } = useFetchCharacters(
    "https://rickandmortyapi.com/api/character",
    query
  );

  return (
    <CharactersContext.Provider
      value={{ characters, isLoading, query, setQuery }}
    >
      {children}
    </CharactersContext.Provider>
  );
}

export function useCharacters() {
  return useContext(CharactersContext);
}
