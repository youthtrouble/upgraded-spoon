import { FaTimes, FaEdit } from 'react-icons/fa';

const Film = ({ film, onDelete, onEdit }) => {
  return (
    <div className="film">
      {/* Header section with title and action icons */}
      <div className='head'>
        <h3>{film.title}</h3>
        <div className='actions'>
          {/* Edit icon */}
          <FaEdit
            size={"1.5rem"}
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => onEdit(film)}
          />
          {/* Delete icon */}
          <FaTimes
            size={"1.5rem"}
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => onDelete(film.id)}
          />
        </div>
      </div>
      {/* Film details */}
      <p>{film.year}</p>
      <p>{film.director}</p>
      <p>{film.stars}</p>
      <p>{film.review}</p>
    </div>
  );
}

export default Film;
