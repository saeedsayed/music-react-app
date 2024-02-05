/* eslint-disable quotes */
import { useParams } from "react-router-dom";
import { Error, Loader, SongCard } from "../components";
import { useGetSearchQuery } from "../redux/services/shazamApi";

const Search = () => {
  const { searchTerm } = useParams();
  const { data, isFetching, error } = useGetSearchQuery(searchTerm);
  const tracks = data?.tracks.hits || [];
  // console.log('tracks: ', tracks);
  if (isFetching) return <Loader title="loading song..." />;
  if (error) return <Error error={error} />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold mt-4 mb-10 text-3xl text-white">
        search for {searchTerm}
      </h2>
      <div className="flex flex-wrap sm-justify-start justify-center gap-8 -mx-4">
        {tracks?.map((song, i) => (
          <SongCard key={song.key} song={song} i={i} tracks={tracks} />
        ))}
      </div>
    </div>
  );
};

export default Search;
