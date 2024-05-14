import Film from './Film';

const Films = ({ films, onDelete, onEdit }) => {
  return (
    <>
      {/* Iterate over the films array and render a Film component for each film */}
      {films.map((film) => (
        <Film 
          key={film.id} // Unique key for each Film component
          film={film} // Pass the film object as a prop
          onDelete={onDelete} // Pass the onDelete function as a prop
          onEdit={onEdit} // Pass the onEdit function as a prop
        />
      ))}
    </>
  );
}

export default Films;
