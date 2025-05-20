import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-bar w-full max-w-3xl mx-auto my-6">
      <form 
        onSubmit={handleSubmit}
        className="search-bar__form relative"
      >
        <input
          type="text"
          placeholder="Buscar por título, autor, género..."
          value={searchQuery}
          onChange={handleChange}
          className="search-bar__input w-full py-3 px-5 pr-12 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-light focus:border-primary-light focus:outline-none transition-all text-black"
        />
        <button
          type="submit"
          className="search-bar__button absolute right-3 top-1/2 transform -translate-y-1/2 text-primary hover:text-primary-dark transition-colors bg-transparent border-none"
          aria-label="Buscar"
        >
          <Search size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar