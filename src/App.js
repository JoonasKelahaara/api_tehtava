import './App.css';
import {useState} from 'react';

const URL = 'https://api.lyrics.ovh/v1/'
// const API_KEY = '';

// Tämän API:n käyttöön ei tarvittu Api-avainta, joten jätän sen kohdan tyhjäksi,

function App() {

  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [result, setResult] = useState('');
  const [head, setHead] = useState('');

  async function search(e) {
    e.preventDefault();
    try {
      const address = URL + artist + '/' + title;
      const response = await fetch(address);

      if (response.ok) {
        const json = await response.json();
        setResult(json.lyrics);
        setHead(artist.toUpperCase() + '-' + title.toUpperCase())
      } else {
        alert("Error retrieving song lyrics!"
              + 'Make sure you wrote the artist and song name correctly!');
      }
    } catch(error) {
      alert(error);
    }
  }

  return (
    <div id="container">
      <form onSubmit={search}>
        <div>
          <h2>Lyrics finder</h2>
        </div>
        <div>
          <p>Type the artist in the artist field and the song name in the song field to find the lyrics!</p>
        </div>
        <div>
          <label>Artist/band name</label>
          <input type="text" value={artist} onChange={e => setArtist(e.target.value)}></input>
        </div>
        <div>
          <label>Song name</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
        </div>
        <div>
          <button>Search</button>
          <h4>{head}</h4>
          <p className="lyricsbox">{result}</p>
        </div>
      </form>
    </div>
  );
}

export default App;
