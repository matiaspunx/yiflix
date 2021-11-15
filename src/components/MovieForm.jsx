import { useState, useEffect } from "react"
import { firebaseGuardarMovie } from '../utils/FirebaseUtils';
import styles from '../scss/MovieForm.module.scss';

export const MovieForm = ({movie}) => {
  const [editedMovie, setEditedMovie] = useState([]);


  useEffect(() => {
    //setEditedMovie({...movie, editedMovie});
    console.log(editedMovie);
  }, [movie, editedMovie]);

  const handleSubmit = (e) => {
    e.preventDefault()
    setEditedMovie({...movie}, editedMovie)
    console.log(editedMovie);
  }

  return (
    <div>
      <form className={styles.movieForm} onSubmit={handleSubmit}>
        <input type="text" name="title" onChange={(e) => editedMovie.title = e.target.value} />
      </form>
    </div>
  )
}
