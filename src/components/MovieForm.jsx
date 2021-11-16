import { useState, useEffect } from "react"
import { firebaseGuardarMovie } from '../utils/FirebaseUtils';
import styles from '../scss/MovieForm.module.scss';

export const MovieForm = (props) => {
  const [editedMovie, setEditedMovie] = useState([]);

  let movie = props.movie;
  let user = props.user

  useEffect(() => {
    setEditedMovie(movie);
  }, [movie]);

  const handleSubmit = (e) => {
    e.preventDefault()

    const timestamp = Date.now();

    editedMovie.title = e.target.title.value;
    editedMovie.trailer = e.target.trailer.value;
    editedMovie.torrent = e.target.torrent.value;
    editedMovie.netflix = e.target.netflix.value;
    editedMovie.overview = e.target.overview.value;
    editedMovie.last_edited = user.displayName;
    editedMovie.last_edited_time = new Intl.DateTimeFormat('en-US', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'}).format(timestamp);

    /* if(isNaN(editedMovie.likes)) {
      editedMovie.likes = 0;
    }
    editedMovie.likes = editedMovie.likes + 1; */

    setEditedMovie({...movie, ...editedMovie})
    firebaseGuardarMovie("movies", editedMovie)
    props.func(true)
  }

  return (
    <div>
      <form className={styles.movieForm} onSubmit={handleSubmit}>
        <h2>Editando como {user.displayName}</h2>
        <label>
          <span>Titulo</span>
          <input type="text" name="title" defaultValue={editedMovie.title} />
        </label>
        <label>
          <span>Sinopsis</span>
          <textarea type="text" rows={6} name="overview" defaultValue={editedMovie.overview} placeholder="Sinopsis"></textarea>
        </label>
        <label>
          <span>Trailer</span>
        <input type="text" name="trailer" defaultValue={editedMovie.trailer} placeholder="Youtube trailer ID" />
        </label>
        <label>
          <span>Torrent</span>
          <input type="text" name="torrent" defaultValue={editedMovie.torrent} placeholder="Torrent URL" />
        </label>
        <label>
          <span>Netflix</span>
          <input type="text" name="netflix" defaultValue={editedMovie.netflix} placeholder="Netflix URL" />
        </label>

        <button type="submit">Guardar peli</button>
      </form>
    </div>
  )
}
