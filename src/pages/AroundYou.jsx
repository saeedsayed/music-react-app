/* eslint-disable quotes */
import { Error, Loader, SongCard } from "../components";
import { useGetSongByCountryQuery } from "../redux/services/shazamApi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { useEffect, useState } from "react";

const CountryTracks = () => {
  const [countryCode, setCountryCode] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_CeRLpK0wwEEg4g74w0eTwQRElhf7T"
      )
      .then((response) => setCountryCode(response?.data?.location?.country))
      .catch((error) => console.log(error))
      .finally(() => setLoader(false));
  }, [countryCode]);

  //   const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongByCountryQuery(countryCode);
  if (isFetching || loader) return <Loader title="loading song..." />;
  if (error && countryCode) return <Error error={error} />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold mt-4 mb-10 text-3xl text-white">
        Around You {countryCode}
      </h2>

      <div className="flex flex-wrap sm-justify-start justify-center gap-8 -mx-4">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            data={data}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryTracks;
