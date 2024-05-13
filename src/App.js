import { useState, useEffect, useCallback } from "react";
import Films from './components/Films';
import Header from './components/Header';
import AddFilm from './components/AddFilm';
import UpdateFilm from './components/UpdateFilm';
import ResponseTypeSelector from './components/ResponseTypeSelector';

function App() {
  const [showAddFilm, setShowAddFilm] = useState(false);
  const [editingFilm, setEditingFilm] = useState(null);
  const [films, setFilms] = useState([]);
  const [responseType, setResponseType] = useState('application/json');
  const [isEditingForm, setIsEditingForm] = useState(false)

  // Use environment variable for the base URL
  const API_URL = process.env.REACT_APP_API_URL;

  //clude responseType in the dependency array
  

    const getFilms = useCallback(async () => {
      // Fetch Films
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
  }; // Include responseType in the dependency array
      const filmsFromServer = await fetchFilms();
      setFilms(filmsFromServer);
    }, [API_URL, responseType]);

  useEffect(() => {  
    getFilms();
  }, [getFilms]); // Include responseType to re-fetch when it changes  

  // UpdateFilm, DeleteFilm and AddFilm functions
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

  const updateFilm = async (updatedFilm) => {
    try {
      const res = await fetch(`${API_URL}/update-film`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updatedFilm),
      });
  
      console.log(res);
  

      if (res.status === 200) {
        getFilms();
        setIsEditingForm(false);
      }
    } catch (error) {
      console.error('Error updating film:', error);
    }
  };

  const deleteFilm = async (id) => {
    await fetch(`${API_URL}/delete-film`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    setFilms(films.filter((film) => film.id !== id));
  };

  const startEdit = (film) => {
    console.log('Editing film:', film)
    setEditingFilm(film);
    setIsEditingForm(true);
  };


  console.log(isEditingForm);
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

function parseResponse(response) {
  const contentType = response.headers.get("Content-Type");
  
  if (contentType.includes("application/json")) {
    return response.json().then(data => {
      return Array.isArray(data) ? data : [data];
    });
  } else if (contentType.includes("application/xml") || contentType.includes("text/xml")) {
    return response.text().then(str => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(str, "application/xml");
      const filmNodes = Array.from(xmlDoc.getElementsByTagName("object"));
      const films = filmNodes.map(filmNode => ({
        id: filmNode.getElementsByTagName("id")[0].textContent,
        title: filmNode.getElementsByTagName("title")[0].textContent,
        year: filmNode.getElementsByTagName("year")[0].textContent,
        director: filmNode.getElementsByTagName("director")[0].textContent,
        stars: filmNode.getElementsByTagName("stars")[0].textContent,
        review: filmNode.getElementsByTagName("review")[0].textContent,
      }));
      return films;
    });
  } else if (contentType.includes("text/plain")) {
    
    return response.text().then(text => {
      let filmDescriptions = text.slice(1, -1).split('], Film [');
    let films = [];

    filmDescriptions.forEach(description => {
        // Use the existing parsing logic for each film
        films.push(parseFilmData(description + ']'));  // Add back the closing bracket removed by split
    });

    return films;
    });
  } else {
    throw new Error(`Unsupported content type: ${contentType}`);
  }
}

function parseFilmData(text) {
  // Remove the prefix "Film [" and the last character ']' to clean up the input string
  text = text.replace(/^Film \[/, '').slice(0, -1);

  // Split the data using commas followed by a key pattern
  let parts = text.split(/,\s*(?=[a-z]+\=)/i);

  // Create the object
  let film = {};

  parts.forEach(part => {
      // Split each part by the first '=' to separate keys and values
      let index = part.indexOf('=');
      let key = part.substring(0, index).trim();
      let value = part.substring(index + 1).trim();

      // Check if value needs further processing (like converting to an array for 'stars')
   
          film[key] = value;

  });

  // Convert numerical values
  if (film.id) film.id = parseInt(film.id);
  if (film.year) film.year = parseInt(film.year);

  return film;
}

export default App;
