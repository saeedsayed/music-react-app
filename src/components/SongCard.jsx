import PlayPause from "./PlayPause";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
const SongCard = ({ song, i, tracks }) => {
  const dispatch = useDispatch();
  const { activeSong } = useSelector((store)=>store.player);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, tracks, i }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col w-[calc(100%/3-2rem)] min-w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className=" relative w-full h-56 group rounded-md overflow-hidden">
        <div
          className={`absolute inset-0 bg-black bg-opacity-50
       group-hover:flex justify-center items-center ${
         activeSong?.key == song?.key ? "flex bg-opacity-70" : "hidden"
       }`}
        >
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          className="w-full h-full object-cover"
          src={song?.images?.coverart||song?.stores?.apple?.coverarturl}
          alt={"song cover for" + song.title}
        />
      </div>
      <Link to={`/songs/${song?.key}`}>
        <p
          title={song?.title}
          className="font-semibold max-w-[240px] text-lg text-white truncate mt-4"
        >
          {song?.title||song?.heading?.title}
        </p>
      </Link>
      <Link to={`/artists/${song?.artists?song.artists[0]?.adamid:''}`}>
        <p className="text-sm max-w-[240px] text-gray-300 truncate mt-1">
          {song?.title||song?.heading?.subtitle}
        </p>
      </Link>
    </div>
  );
};

export default SongCard;
