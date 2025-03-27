import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="flex items-center justify-center mt-5">
    <form onSubmit={handleSubmit }>
      <input className="bg-gray-100 text-black rounded-md p-2 mr-2"
        type="text"
        placeholder="Search for a song..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button  className="bg-[#9E2B25] text-white rounded-md p-2" type="submit">Search</button>
      </form>
      </div>
  );
};

export default SearchBar;
