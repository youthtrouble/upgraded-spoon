import { useState } from 'react'

const AddFillm = ( onAdd ) => {
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [director, setDirector] = useState('')
    const [stars, setStars] = useState('')
    const [review, setReview] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!title) {
            alert('Please add a film')
            return
        }

        onAdd({ title, year, director, stars, review })

        setTitle('')
        setYear('')
        setDirector('')
        setStars('')
        setReview('') 
    }

  return (
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label> Title</label>
            <input type="text" placeholder="Add Title"
            value={title} onChange={(e) =>
            setTitle(e.target.value)}
            />
        </div>
        <div className="form-control">
            <label> Year</label>
            <input type="text" placeholder="Add Year"
            value={year} onChange={(e) =>
            setYear(e.target.value)}
            />
        </div>
        <div className="form-control">
            <label> Director</label>
            <input type="text" placeholder="Add Director"
            value={director} onChange={(e) =>
            setDirector(e.target.value)}
            />
        </div>
        <div className="form-control">
            <label> Stars</label>
            <input type="text" placeholder="Add Stars"
            value={stars} onChange={(e) =>
            setStars(e.target.value)}
            />
        </div>
        <div className="form-control">
            <label> Review</label>
            <input type="text" placeholder="Add Review"
            value={review} onChange={(e) =>
            setReview(e.target.value)}
            />
        </div>

        <input type="submit" value="Save Film" className="btn btn-block"/>
        
    </form>
  )
}

export default AddFillm