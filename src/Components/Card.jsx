import React from "react";
import "../css/Card.css";
// shows random messages while loading images
const loadingMessages = [
  "Loading the latest hits...",
  "Fetching trending tracks...",
  "Finding your next jam... 🎧",
  "Good vibes loading... 🚀",
  "Hold tight, the beats are brewing... ☕",
  "Your playlist is almost here! 🎶",
  "Just a sec... Great tunes ahead!",
  "We’re setting up your personal concert! 🎤",
];

const randomMessage =
  loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

const Cards = ({ tracks }) => {
  return (
    <div>
      {tracks.length > 0 ? (
        <div>
          {tracks.map((track, index) => (
            <div  key={index}>
              <div >
                <img src={track.image || null} alt={track.name} />
              </div>
              <h1 className="">{track.name}</h1>
              <h2>{track.artist}</h2>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="loading-container">
            <div className="loading-bar">
              <div className="progress"></div>
            </div>
            <p>{randomMessage}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cards;
