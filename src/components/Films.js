import Film from './Film';

const Films = ({ films, onDelete, onEdit }) => {
  return (
    <>
      {films.map((film) => (
        <Film key={film.id} film={film} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </>
  );
}

export default Films;
