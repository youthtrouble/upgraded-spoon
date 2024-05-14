import { useState } from 'react';

const AddFilm = ({ onAdd }) => {
  // State hooks for managing form input values
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [director, setDirector] = useState('');
  const [stars, setStars] = useState('');
  const [review, setReview] = useState('');

  // Event handler for form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Basic validation: Check if the title is provided
    if (!title) {
      alert('Please add a film title');
      return;
    }

    // Call the onAdd prop function with the film details
    onAdd({ title, year, director, stars, review });

    // Reset the form fields
    setTitle('');
    setYear('');
    setDirector('');
    setStars('');
    setReview('');
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      {/* Title input */}
      <div className="form-control">
        <label>Title</label>
        <input
          type="text"
          placeholder="Add Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Year input */}
      <div className="form-control">
        <label>Year</label>
        <input
          type="text"
          placeholder="Add Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      {/* Director input */}
      <div className="form-control">
        <label>Director</label>
        <input
          type="text"
          placeholder="Add Director"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
      </div>

      {/* Stars input */}
      <div className="form-control">
        <label>Stars</label>
        <input
          type="text"
          placeholder="Add Stars"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
        />
      </div>

      {/* Review input */}
      <div className="form-control">
        <label>Review</label>
        <input
          type="text"
          placeholder="Add Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>

      {/* Submit button */}
      <input type="submit" value="Save Film" className="btn btn-block" />
    </form>
  );
};

export default AddFilm;
