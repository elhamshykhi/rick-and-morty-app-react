import FavModal from "./FavModal";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function Navbar({ query, setQuery, favorites, handleDeleteFavorite }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="bg-gray-900 px-4 py-6 sm:px-5 md:px-6 border-b z-10 sticky top-0 border-gray-800">
      <div className="lg:container lg:mx-auto lg:max-w-screen-lg flex flex-wrap gap-y-4 sm:gap-x-8">
        <span className="text-lime-400 text-lg font-bold order-1 sm:w-fit">
          Rick & Morty
        </span>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-2 placeholder:text-sm focus:outline-none order-3 text-white capitalize font-medium sm:flex-1 w-full sm:max-w-lg sm:mx-auto sm:order-2 py-1 bg-gray-800 rounded-md border border-gray-700 placeholder:text-gray-500"
        />
        <FavModal
          title="Favorite Characters"
          setIsOpenModal={setIsOpenModal}
          isOpenModal={isOpenModal}
          favorites={favorites}
          handleDeleteFavorite={handleDeleteFavorite}
        />
        <button
          onClick={() => setIsOpenModal(!isOpenModal)}
          className="relative order-2 sm:order-3 sm:w-fit ml-auto"
        >
          <HeartIcon className="w-6 h-6 stroke-orange-500" />
          <span className="bg-gray-700 w-5 h-5 font-medium rounded-full absolute -top-2 -right-2 flex items-center justify-center text-orange-500 text-xs">
            {favorites.length}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
