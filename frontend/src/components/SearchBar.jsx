import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tasks..."
        className="search-input"
      />
      <button type="submit" className="btn btn-search">
        Search
      </button>
      {query && (
        <button type="button" onClick={handleClear} className="btn btn-clear">
          Clear
        </button>
      )}
    </form>
  );
};

export default SearchBar;
