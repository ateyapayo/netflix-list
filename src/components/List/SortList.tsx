import './SortList.css';

interface Props {
  sorting(name: string): void;
}

const SortList = ({ sorting }: Props) => {
  return (
    <div className="sort-container">
      <div className="sort">
      <span>My List</span>
      <button onClick={() => sorting("name")} title="Sort"></button>
      </div>
      <div className='btn-column'>
      </div>
    </div>
  );
};

export default SortList;