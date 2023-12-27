import { ArrowUpCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import Loader from "./Loader";

function CharacterDetail({
  isShowDetail,
  setIsShowDetail,
  selectedId,
  handleAddFavorites,
  addedToFavorites,
}) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        setLoading(true);

        // get a character that is selected
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        // get this character episodes
        const episodesId = data.episode.map((e) => e.split("/").at(-1));
        const res = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );
        setEpisodes([res.data].flat().slice(0, 20));
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
    }

    if (selectedId) fetchCharacter();
  }, [selectedId]);

  // if there was not any character
  if (!character) {
    return (
      <p className="select-none text-white">please select one character!</p>
    );
  }

  return (
    <>
      {isShowDetail && (
        <div className="fixed inset-0 bg-gray-900 z-10 sm:hidden"></div>
      )}

      <div
        className={`${
          isShowDetail
            ? "absolute inset-x-0 w-full top-0 p-4 z-20 bg-gray-900"
            : "hidden sm:block"
        } sm:col-span-7 sm:z-0 md:col-span-6 sm:p-0 sm:static`}
      >
        <XMarkIcon
          className="w-7 h-7 ml-auto text-gray-200 cursor-pointer sm:hidden mb-6"
          onClick={() => setIsShowDetail(false)}
        />

        {loading ? (
          <Loader />
        ) : (
          <div className="">
            <div className="shadow-lg">
              <CharacterInfo
                character={character}
                handleAddFavorites={handleAddFavorites}
                addedToFavorites={addedToFavorites}
              />

              {/* list of episodes */}
              <EpisodeList episodes={episodes} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function CharacterInfo({ character, handleAddFavorites, addedToFavorites }) {
  return (
    <div className="text-gray-200 p-4 bg-gray-800 rounded-lg overflow-hidden mb-2 lg:mb-3 lg:flex lg:items-center lg:gap-x-3 lg:px-3">
      <div className="w-full flex justify-center lg:w-1/3">
        <img
          src={character.image}
          alt={character.name}
          className="w-28 h-28 object-cover rounded-md sm:w-1/3 md:w-1/3 lg:w-full sm:h-auto"
        />
      </div>
      <div className="flex flex-col w-full px-2 pt-6 lg:py-4 lg:px-0 capitalize text-center lg:text-start lg:w-2/3">
        <h3 className="font-bold leading-none text-lg sm:text-xl mb-3 text-lime-400">
          {character.name}
        </h3>
        <span className="text-sm font-medium mb-2">
          <span
            className={`w-2 h-2 ${
              character.status === "Alive" ? "bg-emerald-500" : "bg-red-500"
            } inline-block rounded-full`}
          ></span>
          &nbsp; {character.status}
        </span>

        <span className="text-sm font-medium mb-2">
          {character.species} &nbsp;-&nbsp; {character.gender}
        </span>
        <span className="text-gray-500 text-xs font-medium">
          last known location :
        </span>
        <span className="text-sm mb-6 ">{character.location.name}</span>

        {addedToFavorites ? (
          <p className="text-orange-500 py-2 capitalize text-center font-medium">
            already added to favorites
          </p>
        ) : (
          <button
            type="button"
            onClick={() => handleAddFavorites(character)}
            className="bg-lime-400 text-gray-900 capitalize font-semibold py-2 rounded-md max-w-xs mx-auto w-full"
          >
            add to favorites
          </button>
        )}
      </div>
    </div>
  );
}

function EpisodeList({ episodes }) {
  const [sortBy, setSortBy] = useState(true);

  // sort episodes by date
  let sortedEpisodes = episodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex flex-col gap-y-1">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl text-gray-200 capitalize">list of episodes</p>
        <ArrowUpCircleIcon
          onClick={() => setSortBy((prev) => !prev)}
          style={!sortBy ? { transform: "rotate(180deg)" } : {}}
          className="w-6 h-6 text-lime-400 transition-300 cursor-pointer"
        />
      </div>
      {sortedEpisodes.map((item, index) => (
        <div
          className="text-gray-400 flex items-center justify-between min-[500px]:items-center"
          key={item.id}
        >
          <span className="font-medium text-xs lg:text-sm w-2/3">
            {String(index + 1).padStart(2, "0")} -&nbsp;
            {item.name}
          </span>
          <span className="text-[10px] bg-gray-700 lg:text-xs px-2 sm:px-2 text-center rounded-full py-0.5 w-1/3 inline-block">
            {item.air_date.slice(0, 3) + " " + item.air_date.slice(-8)}
          </span>
        </div>
      ))}
    </div>
  );
}
export default CharacterDetail;
