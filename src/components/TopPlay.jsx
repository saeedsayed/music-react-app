import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamApi";
import "swiper/css";
import "swiper/css/free-mode";

export const TopChartCard = ({
  song,
  i,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div className="flex flex-row py-2 p-4 items-center hover:bg-[#4c426e] rounded-lg mb-2">
      <div className="text-white font-bold mr-3">{i + 1}.</div>
      <div className="flex-1 flex flex-row gap-2 items-center max-w-[calc(100%-4rem)]">
        <img
          src={song?.images?.coverart}
          className="w-10 h-10 rounded-lg"
          alt="img"
        />
        <div className="flex-1 flex flex-col max-w-[80%]">
          <Link to={`/songs/${song.key}`}>
            <h6
              className="truncate w-44 md:w-full text-white font-bold"
              title={song?.title}
            >
              {song?.title}
            </h6>
          </Link>
          <Link to={`/artists/${song?.artists[0].adamid}`}>
            <p className="text-white/80">{song.subtitle}</p>
          </Link>
        </div>
      </div>
      <PlayPause
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  );
};

const TopPlay = () => {
  const dispatch = useDispatch();
  const { data } = useGetTopChartsQuery();
  const { tracks } = data || [];
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const divRef = useRef(null);
  const topPlays = tracks?.slice(0, 5);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, tracks, i }));
    dispatch(playPause(true));
  };

  useEffect(() => {
    divRef.current.scrollIntoView();
  }, [tracks]);
  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[250px] max-w-full flex flex-col 
      hide-scrollbar"
    >
      <div className="w-full flex flex-col">
        <div className="flex justify-between flex-row items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1 max-h-[calc(100vh-360px)] overflow-y-scroll hide-scrollbar">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-4 w-full">
        <div className="flex justify-between flex-row items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          // modules={[FreeMode]}
          className="mt-4 mx-0"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song.key}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg overflow-hidden rounded-full animate-slideright select-none"
            >
              <Link to={`/artists/${song?.artists[0]?.adamid}`}>
                <img src={song.images.background} alt="artist Image" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
