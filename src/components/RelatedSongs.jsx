import SongBar from "./SongBar";
import { useGetSongRelatedQuery } from "../redux/services/shazamApi";
const RelatedSongs = ({ artistId, id }) => {
  const { data: relatedSongsData, isFetching: isFetchingRelated } =
    useGetSongRelatedQuery(id);
  if (!isFetchingRelated) {
    return (
      <>
        <h1 className="text-white text-3xl my-8 font-bold">Related Songs:</h1>
        {relatedSongsData.tracks?.map((song, i) => (
          <SongBar
            key={i}
            artistId={artistId}
            i={i}
            song={song}
            tracks={relatedSongsData}
          />
        ))}
      </>
    );
  }
};

export default RelatedSongs;
