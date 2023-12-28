import axios from "axios";
import { useEffect, useReducer, useRef } from "react";
import toast from "react-hot-toast";

const initialState = { characters: [], isLoading: false };

function charactersReducer(state, { type, payload }) {
  switch (type) {
    case "pending":
      return { isLoading: true };
    case "success":
      return { characters: payload, isLoading: false };
    case "reject":
      return { characters: [], isLoading: false };
    default:
      return state;
  }
}

export default function useFetchCharacters(url, query) {
  const [{ characters, isLoading }, dispatch] = useReducer(
    charactersReducer,
    initialState
  );

  const effectRun = useRef(false);

  // fetch data from Api for first render and when query changes
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // get characters
    async function fetchData() {
      dispatch({ type: "pending" });
      try {
        const { data } = await axios.get(`${url}/?name=${query}`, { signal });
        dispatch({ type: "success", payload: data.results });
      } catch (error) {
        dispatch({ type: "reject" });
        toast.error(error.response.data.error);
      }
    }

    // Check if useEffect has run the first time
    if (effectRun.current) {
      fetchData();
    }

    // cleanup
    return () => {
      controller.abort();
      // update the value of effectRun to true when app is mounted the second time because of StrictMode
      effectRun.current = true;
    };
  }, [url, query]);

  return { characters, isLoading };
}
