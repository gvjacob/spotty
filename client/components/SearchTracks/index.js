import React from 'react';

const SearchTracks = ({ className, tracks, onClick }) => {
  return (
    <div className={className}>
      {tracks.map(({ id, name, artist }) => (
        <div onClick={() => onClick(id)}>
          <div>{name}</div>
        </div>
      ))}
    </div>
  );
};

export default SearchTracks;
