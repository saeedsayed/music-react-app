import { useParams } from "react-router-dom";
import { Error, Loader, DetailsHeader, RelatedSongs } from "../components";
import { useGetSongDetailsQuery } from "../redux/services/shazamApi";
const SongDetails = () => {
  const { songid } = useParams();
  const {
    data: songData,
    isFetching: isFetchingSongData,
    error: errorSongData,
  } = useGetSongDetailsQuery(songid);

  if (isFetchingSongData)
    return <Loader title="loading song details..." />;
  if (errorSongData) return <Error />;

  return (
    <div>
      <DetailsHeader
        songDetails={songData}
        // handlePause={handlePauseClick}
        // handlePlay={() => handlePlayClick(songData)}
      />
      <div>
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        {songData?.sections[1].type == "LYRICS" ? (
          songData?.sections[1].text.map((line, i) => (
            <p key={i} className="text-gray-400 my-1">
              {line}
            </p>
          ))
        ) : (
          <p className="text-gray-400 my-1">Sorry, no lyrics found!</p>
        )}
      </div>
      <RelatedSongs id={songid} />
    </div>
  );
};

export default SongDetails;
