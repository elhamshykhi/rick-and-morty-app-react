import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(url, query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const effectRun = useRef(false);

  // fetch data from Api for first render and when query changes
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // get characters
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}/?name=${query}`, { signal });

        setCharacters(data.results);
      } catch (error) {
        setCharacters([]);
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
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
