/* eslint-disable quotes */
import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamApi";
import {  useSelector } from "react-redux";

const TopCharts = () => {



  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  const { tracks } = data || [];
  if (isFetching) return <Loader title="loading song..." />;
  if (error) return <Error error={error} />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold mt-4 mb-10 text-3xl text-white">
        Discover Top Charts #
      </h2>

      <div className="flex flex-wrap sm-justify-start justify-center gap-8 -mx-4">
        {tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            tracks={tracks}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
