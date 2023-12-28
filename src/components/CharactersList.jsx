import { HeartIcon } from "@heroicons/react/24/outline";
import Loader from "../components/Loader";
import { useCharacters } from "../context/CharactersContext";
import { useFavorites } from "../context/FavoritesContext";

function Character({ id, image, name }) {
  const { handleDetail, selectedId, favorites } = useFavorites();
  const isInFav = favorites.map((fav) => fav.id).includes(id);

  return (
    <div
      onClick={() => handleDetail(id)}
      className="cursor-pointer relative bg-gray-700 rounded-xl col-span-6 min-[450px]:col-span-4 sm:col-span-6 md:col-span-4"
      style={selectedId === id ? { backgroundColor: "rgb(163 230 53)" } : {}}
    >
      <div className="absolute top-1 left-1">
        <HeartIcon
          className={`${
            isInFav ? "fill-orange-600" : ""
          } w-5 h-5 stroke-orange-600`}
        />
      </div>
      <div className="rounded-xl rounded-tl-[60px] relative group m-1 overflow-hidden">
        <img src={image} alt={name} />

        <div className="bg-gray-900 absolute bottom-0 left-0 leading-8 text-center right-0 text-lime-400 text-xs font-medium w-full h-8 bg-opacity-80">
          {name}
        </div>
      </div>
    </div>
  );
}

function CharactersList() {
  const { characters, isLoading } = useCharacters();

  return (
    <div className="col-span-12 sm:col-span-5 md:col-span-6 min-h-screen pb-6">
      <div className="grid grid-cols-12 gap-2 lg:gap-3">
        {isLoading ? (
          <Loader />
        ) : (
          characters.map((item) => <Character key={item.id} {...item} />)
        )}
      </div>
    </div>
  );
}

export default CharactersList;
