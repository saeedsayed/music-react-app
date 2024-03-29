import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start w-[35%]">
    <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:block h-16 w-16 mr-4`}>
      <img src={activeSong?.images?.coverart||activeSong?.stores?.apple?.coverarturl} alt="cover art" className="rounded-full" />
    </div>
    <div className="w-[80%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.title || activeSong?.heading?.title || 'No active Song'}
      </p>
      <p className="truncate text-gray-300">
        {activeSong?.subtitle || activeSong?.heading?.subtitle || 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
