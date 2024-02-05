import { useParams } from "react-router-dom";
import { Error, Loader, DetailsHeader, RelatedSongs } from "../components";
import { useGetArtistsDetailsQuery } from "../redux/services/shazamApi";
import { useSelector } from "react-redux";

const ArtistDetails = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { id: artistId } = useParams();
  const {
    data: artistData,
    isFetching: isFetchingArtistData,
    error: errorArtistData,
  } = useGetArtistsDetailsQuery(artistId);

  if (isFetchingArtistData) return <Loader title="loading artist details..." />;
  if (errorArtistData) return <Error />;

  return (
    <div>
      <DetailsHeader artistId={artistId} artistData={artistData} />
      {/* <RelatedSongs
        id={artistId}
        artistId={artistId}
      /> */}
    </div>
  );
};

export default ArtistDetails;
