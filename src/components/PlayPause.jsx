import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
const PlayPause = ({ song, handlePause, handlePlay }) => {
  const { isPlaying, activeSong } = useSelector((store) => store.player);
  return isPlaying && activeSong?.key === song?.key ? (
    <FaPauseCircle
      size={35}
      className="text-gray-300 cursor-pointer"
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      size={35}
      className="text-gray-300 cursor-pointer"
      onClick={handlePlay}
    />
  );
};

export default PlayPause;
