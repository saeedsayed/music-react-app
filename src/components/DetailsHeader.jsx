import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useDispatch } from "react-redux";

const DetailsHeader = ({ artistId, artistData, songDetails }) => {
  const artist = artistData?.data[0].attributes;
  const dispatch = useDispatch();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song:songDetails }));
    dispatch(playPause(true));
  };
  return (
    <div className=" relative flex flex-col">
      <div className="bg-gradient-to-l  from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center">
        <img
          src={
            artistId
              ? artist?.artwork?.url.replace("{w}", "500").replace("{h}", "400")
              : songDetails?.images?.coverart
          }
          alt="art"
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-contain border-2 shadow-xl shadow-black"
        />
        <div className="ml-5 flex-1">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artist?.name : songDetails?.title}
          </p>
          {!artistId && (
            <Link to={`/artists/${songDetails?.artists[0].adamid}`}>
              <p className="text-gray-400 mt-2">{songDetails?.subtitle}</p>
            </Link>
          )}
          <p className="text-gray-400 mt-2">
            {artistId ? artist?.genreNames[0] : songDetails?.genres?.primary}
          </p>
        </div>
        {!artistData && (
          <PlayPause
            song={songDetails}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        )}
      </div>
      <div className="sm:h-48 h-24"></div>
    </div>
  );
};

export default DetailsHeader;
