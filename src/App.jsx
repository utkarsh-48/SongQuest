import { useState, useEffect } from "react";
import { searchTracks, getTrendingTracks } from "./Details/SpotifyService";
import SearchBar from "./Details/SearchBar";
import Cards from "./Components/Card";
import Title from "./Components/Title";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
function App() {
  const [tracks, setTracks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Renders the Trending songs before search 
  useEffect(() => {
    const fetchTrending = async () => {
      const trendingTracks = await getTrendingTracks();
      setTracks(trendingTracks);
    };

    fetchTrending();
  }, []);

  const handleSearch = async (query) => {
    if (!query) return;
    
    setIsSearching(true); // Hides trending songs after search
    const results = await searchTracks(query);
    setTracks(results);
  };

  return (
    <div>
      < NavBar />
      < Title />
      <div className="flex flex-col items-center">
          <SearchBar onSearch={handleSearch} />
          <h2 className="mt-5 text-2xl">{isSearching ? "Search Results" : "Trending Songs"}</h2>
      </div>
      <Cards tracks={tracks} />
      {/* < Footer /> */}
    </div>
  );
}

export default App;
