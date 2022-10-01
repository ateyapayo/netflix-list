import './TitlesList.css';

interface Props {
  items: {id: number, name: string}[];
  deleteTitle: (companyNameToDelete: string) => void;
};

const CompaniesList = ({ items, deleteTitle }: Props) => {
return (
    <ul>
      {items.map(title => (
        <li key={title.id}>
          <span>{title.name}</span>
          <button className="delete-title" onClick={deleteTitle.bind(null, title.name)} />
        </li>
      ))}
      {items.length === 0 && (
        <div className="no-found">
          <h2>No movie found.</h2>
        </div>
      )}
    </ul>
  );
};

export default CompaniesList;
