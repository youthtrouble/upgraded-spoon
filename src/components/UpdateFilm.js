import { useState } from 'react';

const UpdateFilm = ({ filmToUpdate, onUpdate }) => {
  // Initialize state with the current values of the film to be updated
  const [title, setTitle] = useState(filmToUpdate.title);
  const [year, setYear] = useState(filmToUpdate.year);
  const [director, setDirector] = useState(filmToUpdate.director);
  const [stars, setStars] = useState(filmToUpdate.stars);
  const [review, setReview] = useState(filmToUpdate.review);

  // Event handler for form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Basic validation: Check if the title is provided
    if (!title) {
      alert('Title is required');
      return;
    }

    // Call the onUpdate prop function with the updated film details
    onUpdate({ id: filmToUpdate.id, title, year, director, stars, review });

    // Reset the form fields
    setTitle('');
    setYear('');
    setDirector('');
    setStars('');
    setReview('');
  }

  return (
    <form className="add-form">
      {/* Title input */}
      <div className="form-control">
        <label>Title</label>
        <input
          type="text"
          placeholder="Edit Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Year input */}
      <div className="form-control">
        <label>Year</label>
        <input
          type="text"
          placeholder="Edit Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      {/* Director input */}
      <div className="form-control">
        <label>Director</label>
        <input
          type="text"
          placeholder="Edit Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
      </div>

      {/* Stars input */}
      <div className="form-control">
        <label>Stars</label>
        <input
          type="text"
          placeholder="Edit Stars"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
        />
      </div>

      {/* Review input */}
      <div className="form-control">
        <label>Review</label>
        <input
          type="text"
          placeholder="Edit Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>

      {/* Update button */}
      <input
        type="button"
        onClick={onSubmit}
        value="Update Film"
        className="btn btn-block"
      />
    </form>
  );
}

export default UpdateFilm;
