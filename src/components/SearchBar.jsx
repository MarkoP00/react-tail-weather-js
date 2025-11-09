import { MapPin, Search, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { searchCities } from "../services/weatherAPI";

const SearchBar = ({ onSearch, onLoactionSearch, loading }) => {
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestions] = useState([]);
  const [showSuggestion, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const searchRef = useRef();

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length > 2) {
        setSearchLoading(true);
        try {
          const result = await searchCities(query);
          setSuggestions(result);
          setShowSuggestions(true);
        } catch (error) {
          console.error(`Search Failed:`, error);
        } finally {
          setSearchLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log(query);

      onSearch(query.trim());
      // setQuery("");
      setShowSuggestions(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionsClick = (city) => {
    const cityName = city.name;

    onSearch(cityName);
    setQuery("");
    setShowSuggestions(false);
  };
  return (
    <div className="relative w-full max-w-2xl">
      <form className="relative" onSubmit={handleSubmit}>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray/60 w-5 h-5 group-focus-within:text-white transition-all" />
          <input
            type="text"
            disabled={loading}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for any city worldwide..."
            className="w-full pl-12 pr-24 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 hover:bg-white/15"
          />
          {/* conditional rendering */}
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-14 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onLoactionSearch}
            disabled={loading}
            className=" absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-all p-1 rounded-full hover:bg-white/10"
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* conditional rendering */}
      {showSuggestion && (suggestion.length > 0 || searchLoading) && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50">
          {searchLoading ? (
            <div className="p-6 text-center text-white/70">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white mx-auto"></div>
              <p>Searching Cities...</p>
            </div>
          ) : (
            suggestion.map((city, index) => {
              /* else - suggestions */
              return (
                <button
                  onClick={() => handleSuggestionsClick(city)}
                  key={`${city.name}-${city.country}-${index}`}
                  className="w-full px-6 py-4 text-left hover:bg-white/10 transition-all duration-200 flex items-center justify-between group border-b border-white/10 last:border-b-0"
                >
                  <div>
                    <div className="font-medium text-white group-hover:text-white/90 ">
                      {city.name}
                      {/* conditional rendering */}
                      {city.state && (
                        <span className="text-white/70">, {city.state}</span>
                      )}
                    </div>
                    <div className="text-sm text-white/60">{city.country}</div>
                  </div>

                  <Search className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-all" />
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
