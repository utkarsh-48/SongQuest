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
      <div className=" p-6 md:p-10">
        {tracks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
            {tracks.map((track, index) => (
              <div
                key={index}
                className="
                  text-white p-4 rounded-lg flex items-center space-x-4 
                  bg-black/30 border border-gray-700 shadow-lg shadow-gray-900/50 
                  hover:bg-gray-800 transition duration-200 backdrop-blur-lg
                "
              >
                <div className="w-24 h-24">
                  <img
                    src={track.image || '/default-image.jpg'}
                    alt={track.name}
                    className="w-full h-full object-cover rounded-md"   
                  />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold">{track.name}</h1>
                  <h2 className="text-gray-400 text-sm">{track.artist}</h2>
                </div>
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
