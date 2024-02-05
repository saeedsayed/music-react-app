/* eslint-disable quotes */
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsGenreQuery } from "../redux/services/shazamApi";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsGenreQuery(genreListId);
  const { tracks } = data || [];
  if (isFetching) return <Loader title="loading song..." />;
  if (error) return <Error error={error} />;
  return (
    <div className="flex flex-col">
      <div
        className="w-full flex justify-between items-center
        sm:flex-row flex-col mt-4 mb-10"
      >
        <h2 className="font-bold text-3xl text-white">
          Discover{" "}
          {genres.find(({ value }) => genreListId == value)?.title || "POP"}
        </h2>
        <select
          value={genreListId || "POP"}
          className=" bg-black text-gray-300 p-3 text-sm rounded-lg
      outline-none sm:mt-0 mt-5 cursor-pointer"
          onChange={(e) => {
            dispatch(selectGenreListId(e.target.value));
          }}
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm-justify-start justify-center gap-8 -mx-4">
        {tracks?.map((song, i) => (
          <SongCard key={song.key} song={song} i={i} tracks={tracks} />
        ))}
      </div>
    </div>
  );
};
export default Discover;
