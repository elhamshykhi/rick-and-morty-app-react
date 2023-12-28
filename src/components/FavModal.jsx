import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useFavorites } from "../context/FavoritesContext";

function FavModal({ title, setIsOpenModal, isOpenModal }) {
  const { favorites, handleDeleteFavorite } = useFavorites();

  return (
    <>
      {isOpenModal && (
        <>
          <div
            className="bg-gray-900 z-50 bg-opacity-90 w-screen min-h-full fixed top-0 left-0 right-0"
            onClick={() => setIsOpenModal(false)}
          ></div>

          <div className="w-[90%] max-w-lg rounded-xl bg-gray-800 z-50 h-96 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 p-4">
            {/* modal header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-semibold text-xl text-lime-400">{title}</h2>
              <button
                type="button"
                className="w-7 h-7 bg-transparent border-0 outline-none"
                onClick={() => setIsOpenModal(false)}
              >
                <XMarkIcon className="stroke-red-600 w-7 h-7" />
              </button>
            </div>

            {/* modal body */}
            <div id="modal" className="max-h-72 overflow-auto">
              {!favorites.length ? (
                <p className="font-semibold text-lg text-gray-600 text-center capitalize select-none">
                  there is nothing in favorites
                </p>
              ) : (
                favorites.map((character) => (
                  <div
                    key={character.id}
                    className="flex items-center justify-between p-2 mb-2 last:mb-0 text-gray-200 bg-gray-900 rounded-lg overflow-hidden"
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20">
                        <img
                          src={character.image}
                          alt={character.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex flex-col p-2 capitalize">
                        <h3 className="font-semibold text-sm sm:text-base leading-none mb-2 text-lime-400">
                          {character.name}
                        </h3>
                        <span className="text-xs sm:text-sm font-medium mb-2">
                          <span
                            className={`w-2 h-2 ${
                              character.status === "Alive"
                                ? "bg-emerald-400"
                                : "bg-red-400"
                            } inline-block rounded-full`}
                          ></span>
                          &nbsp; {character.status} - {character.species}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteFavorite(character.id)}
                    >
                      <TrashIcon className="w-5 h-5 stroke-red-600 pointer-events-none" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FavModal;
