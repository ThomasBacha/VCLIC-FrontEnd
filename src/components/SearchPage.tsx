import React, { useState } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

const SearchComponent: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search value sets..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default SearchComponent;
