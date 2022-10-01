import './Search.css';

import { ChangeEvent } from "react";

interface Props {
  searchedTitle: string;
  onSearch(event: ChangeEvent<HTMLInputElement>): void;
  clearSearch(): void;
}

const Search = ({ searchedTitle, onSearch, clearSearch }: Props) => {
  return (
    <div className="search">
        <input
          type="text"
          placeholder="Search title"
          value={searchedTitle}
          onChange={onSearch}
          autoComplete="off"
        />
        <span hidden={!searchedTitle} onClick={clearSearch} className="clear-search">&times;</span>
    </div>
  )
};


export default Search;