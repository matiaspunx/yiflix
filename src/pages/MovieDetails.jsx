import { useEffect, useState } from 'react'
import styles from '../scss/MovieDetails.module.scss'
import { useParams } from 'react-router';
import { get } from '../utils/httpClient';
import { Spinner } from '../components/Spinner';
import { getMovieImg } from '../utils/getMovieImg';

export const MovieDetails = () => {
  const urlParams = useParams();
  const movieId = urlParams.movieId;
  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    get('/movie/'+ movieId).then(data => {
      setMovie(data);
      setIsLoading(false);
    })
  }, [movieId])

  if(isLoading) {
    return <Spinner />
  }
  if(!movie) {
    return null
  }

  const imgUrl = getMovieImg(movie.poster_path, 500);

  return (
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
  )
}
