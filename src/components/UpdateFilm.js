import { useState } from 'react';

const UpdateFilm = ({ filmToUpdate, onUpdate }) => {
    console.log('Editing film:', filmToUpdate   );
    const [title, setTitle] = useState(filmToUpdate.title);
    const [year, setYear] = useState(filmToUpdate.year);
    const [director, setDirector] = useState(filmToUpdate.director);
    const [stars, setStars] = useState(filmToUpdate.stars);
    const [review, setReview] = useState(filmToUpdate.review);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!title) {
            alert('Title is required');
            return;
        }

        onUpdate({ id: filmToUpdate.id, title, year, director, stars, review });
        setTitle('');
        setYear('');
        setDirector('');
        setStars('');
        setReview('');
    }

    return (
        <form className="add-form" >
            <div className="form-control">
                <label>Title</label>
                <input type="text" placeholder="Edit Title"
                    value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Year</label>
                <input type="text" placeholder="Edit Year"
                    value={year} onChange={(e) => setYear(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Director</label>
                <input type="text" placeholder="Edit Director"
                    value={director} onChange={(e) => setDirector(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Stars</label>
                <input type="text" placeholder="Edit Stars"
                    value={stars} onChange={(e) => setStars(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Review</label>
                <input type="text" placeholder="Edit Review"
                    value={review} onChange={(e) => setReview(e.target.value)} />
            </div>
            <input type="button" onClick={onSubmit} value="Update Film" className="btn btn-block" />
        </form>
    );
}

export default UpdateFilm;
