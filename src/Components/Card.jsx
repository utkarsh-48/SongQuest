import React from 'react'
const Cards = ({ tracks }) => {
  return (
    <div>
      {tracks.length > 0 ? (
        <ul>
          {tracks.map((track, index) => (
            <li key={index} style={{ marginBottom: "20px" }}>
              <img src={track.image} alt={track.name} width="150" />
              <p><strong>Name:</strong> {track.name}</p>
              <p><strong>Artist:</strong> {track.artist}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Search for a song above!</p>
      )}
    </div>
  );
};

export default Cards;
