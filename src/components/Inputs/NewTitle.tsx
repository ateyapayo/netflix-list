import { ChangeEvent } from "react";

import './NewTitle.css';


interface Props {
  movieTitle: string;
  addTitle(event: ChangeEvent<EventInit>): void;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
  validation: boolean;
}

const NewCompany = ({ movieTitle, addTitle, handleChange, validation }: Props) => {
  return (
    <div className={`new-title ${!validation ? 'invalid' : ''}`}>
      <form onSubmit={addTitle}>
        <input
          type="text"
          placeholder="Add a new movie"
          name="movie"
          value={movieTitle}
          onChange={handleChange}
          autoComplete="off"
        />
        <button 
          className="plus-button" 
          onClick={addTitle} 
          type="submit"
        />
      </form>

      <div className="empty-input">
        <span>You can't submit an empty input.</span>
      </div>
    </div>
  );
};

export default NewCompany;