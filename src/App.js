import { useState, useEffect, useCallback } from "react";
import Films from './components/Films';
import Header from './components/Header';
import AddFilm from './components/AddFilm';
import UpdateFilm from './components/UpdateFilm';
import ResponseTypeSelector from './components/ResponseTypeSelector';
import { parseResponse } from './utils/parserUtil';

function App() {
  // State hooks for managing component state
  const [showAddFilm, setShowAddFilm] = useState(false); // Controls visibility of AddFilm component
  const [editingFilm, setEditingFilm] = useState(null); // Holds the film being edited
  const [films, setFilms] = useState([]); // Stores the list of films
  const [responseType, setResponseType] = useState('application/json'); // Stores the desired response type
  const [isEditingForm, setIsEditingForm] = useState(false); // Controls the state of the editing form

  // Base URL for the API, retrieved from environment variables
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetches the list of films from the server
  const getFilms = useCallback(async () => {
    const fetchFilms = async () => {
      const res = await fetch(`${API_URL}/films`, {
        headers: {
          'Accept': responseType,
        },
      });
    
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    
      return parseResponse(res);
    };
    
    const filmsFromServer = await fetchFilms();
    setFilms(filmsFromServer);
  }, [API_URL, responseType]);

  // Effect hook to fetch films whenever the responseType changes
  useEffect(() => {  
    getFilms();
  }, [getFilms]);

  // Adds a new film
  const addFilm = async (film) => {
    const res = await fetch(`${API_URL}/add-film`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(film),
    });

    const data = await res.json();
    setFilms([...films, data]);
  };

  // Updates an existing film
  const updateFilm = async (updatedFilm) => {
    try {
      const res = await fetch(`${API_URL}/update-film`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedFilm),
      });
  
      if (res.status === 200) {
        getFilms();
        setIsEditingForm(false);
      }
    } catch (error) {
      console.error('Error updating film:', error);
    }
  };

  // Deletes a film by its ID
  const deleteFilm = async (id) => {
    await fetch(`${API_URL}/delete-film/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    setFilms(films.filter((film) => film.id !== id));
  };

  // Initiates editing for a selected film
  const startEdit = (film) => {
    setEditingFilm(film);
    setIsEditingForm(true);
  };

  return (
    <div className="container">
      <Header onAdd={() => setShowAddFilm(!showAddFilm)} showAdd={showAddFilm} />
      <ResponseTypeSelector onChange={(e) => setResponseType(e.target.value)} />
      {showAddFilm && <AddFilm onAdd={addFilm} />}
      {isEditingForm ? (
        <UpdateFilm filmToUpdate={editingFilm} onUpdate={updateFilm} />
      ) : (
        films.length > 0 ? (
          <Films films={films} onDelete={deleteFilm} onEdit={startEdit} />
        ) : 'No Films To Show'
      )}
    </div>
  );
}

export default App;
