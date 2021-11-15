import { useEffect, useState } from 'react'
import styles from '../scss/MovieDetails.module.scss'
import { useParams } from 'react-router';
import { get } from '../utils/httpClient';
import { Spinner } from '../components/Spinner';
import { MovieForm } from '../components/MovieForm';
import { getMovieImg } from '../utils/getMovieImg';

import { firebaseBuscarMovie, firebaseGuardarMovie } from '../utils/FirebaseUtils';

export const MovieDetails = () => {
  const urlParams = useParams();
  const movieId = urlParams.movieId;
  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    get('/movie/'+ movieId).then(data => {
      buscarMovie(data, data.imdb_id);
      setIsLoading(false);
    })

  }, [movieId])

  useEffect(() => {
    console.log('se modifico la peli');
    setMovie(movie);
  }, [edit])

  async function buscarMovie(data, id) {
    let resultado = await firebaseBuscarMovie("movies", id);

    if (!resultado) {
      console.log('esta movie no existe en firebase la voy a crear...');
      firebaseGuardarMovie("movies", data);
      setMovie(data);
    } else {
      setMovie(resultado);
    }
  }

  function editMovie() {
    movie.title = `[EDIT] ${movie.title}`;
    firebaseGuardarMovie("movies", movie);
    setEdit(true);
  }

  if(isLoading) {
    return <Spinner />
  }
  if(!movie) {
    return null
  }

  const imgUrl = getMovieImg(movie.poster_path, 500);

  return (
    <>
    <div className={styles.dContainer}>
      <div className={`${styles.col} ${styles.col_img}`}>
        <img width={500} height={750} src={imgUrl} alt={movie.title} />
      </div>

      <div className={`${styles.col} ${styles.details}`}>
        <h2>{movie.title}</h2>
        {movie.genres.map(genero => genero.name).join(', ')}
        <p>{movie.overview}</p>
      </div>
    </div>
    <div><button onClick={() => editMovie()}>Editar</button></div>
    {edit === true ? <MovieForm movie={movie} /> : ''}
    </>
  )
}