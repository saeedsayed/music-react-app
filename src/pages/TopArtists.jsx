/* eslint-disable quotes */
import { Error, Loader, ArtistCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamApi";

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const { tracks } = data || [];
  if (isFetching) return <Loader title="loading song..." />;
  if (error) return <Error error={error} />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold mt-4 mb-10 text-3xl text-white">Top Artists</h2>

      <div className="flex flex-wrap sm-justify-start justify-center gap-8 -mx-4">
        {tracks?.map((track) => (
          <ArtistCard key={track.key} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
