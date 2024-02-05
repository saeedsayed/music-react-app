import { useNavigate } from "react-router-dom";
const ArtistCard = ({ track }) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/artists/${track?.artists[0]?.adamid}`)}
      className="flex flex-col w-[calc(100%/3-2rem)] min-w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
    >
      <img
        src={track?.images?.coverart}
        alt={track?.subtitle}
        className="w-full h-56 rounded-lg"
      />
      <p className="text-white text-lg mt-4">{track?.subtitle}</p>
    </div>
  );
};

export default ArtistCard;
