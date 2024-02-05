import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="p-2 text-gray-400 focus-within:text-gray-600"
    >
      <label htmlFor="search-field" className="sr-only">
        search all songs
      </label>
      <div className="flex  justify-start items-center">
        <FiSearch className="w-5 h-5 ml-4" />
        <input
          id="search-field"
          type="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className="bg-transparent border-none flex-1 outline-none placeholder-gray-500 text-white p-4"
        />
      </div>
    </form>
  );
};

export default Searchbar;
