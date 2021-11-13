import styles from '../scss/MovieItem.module.scss'
import {
  Link
} from "react-router-dom";
import { getMovieImg } from '../utils/getMovieImg';

export const MovieItem = ({movie}) => {
  const imgUrl = getMovieImg(movie.poster_path, 300)

  return (
    <li className={styles.movieItem}>
      <Link to={"/movie/"+movie.id}>
      <img width={200} height={300} src={imgUrl} alt={movie.title} />
      {/* <div>{movie.title}</div> */}
      </Link>
    </li>
  )
}