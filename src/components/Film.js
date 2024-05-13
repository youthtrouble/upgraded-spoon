import { FaTimes, FaEdit } from 'react-icons/fa';

const Film = ({ film, onDelete, onEdit }) => {
  return (
    <div className="film">
            

        <div className='head'>
          <h3>
            {film.title} 
          </h3>

          <div className='actions'> 
          <FaEdit oncli size={"1.5rem"} style={{ color: 'blue', cursor: 'pointer' }} onClick={() => onEdit(film)} />
          <FaTimes size={"1.5rem"} style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(film.id)} />
          </div>
        </div>
        <p>{film.year}</p>
        <p>{film.director}</p>
        <p>{film.stars}</p>
        <p>{film.review}</p>
    </div>
  );
}

export default Film;
