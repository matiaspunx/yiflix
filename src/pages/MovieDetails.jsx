import { useEffect, useState } from 'react'
import styles from '../scss/MovieDetails.module.scss'
import torrent from '../assets/img/torrent.png'
import netflix from '../assets/img/netflix.png'
import { useParams } from 'react-router';
import { get } from '../utils/httpClient';
import { Spinner } from '../components/Spinner';
import { MovieForm } from '../components/MovieForm';
import { getMovieImg } from '../utils/getMovieImg';

import firebaseApp from '../utils/FirebaseCredenciales';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { firebaseBuscarMovie, firebaseGuardarMovie } from '../utils/FirebaseUtils';

const firestore = getFirestore(firebaseApp);

export const MovieDetails = ({user}) => {
  const urlParams = useParams();
  const movieId = urlParams.movieId;
  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editado, setEditado] = useState(false);
  const [clicked, setClicked] = useState(false)

  const pull_data = (data) => {
    setEditado(data);
  }

  useEffect(() => {
    handleLikes();
  }, [clicked]);

  useEffect(() => {
    if(movie) {
    document.body.style.setProperty('--background', 'url('+getMovieImg(movie.poster_path, 500)+')');
    }
  }, [movie]);

  useEffect(() => {
    setIsLoading(true);

    get('/movie/'+ movieId).then(data => {
      buscarMovie(data, data.imdb_id);
    })

  }, [movieId])

  useEffect(() => {
    fbSnap()
  }, [editado])


  function fbSnap() {
    if(movie) {
      let ref = doc(firestore, 'movies', movie.imdb_id)
      const unsub = onSnapshot(ref, (doc) => {
        let res = doc.data();
        if(res) {
          setMovie(res);
        }
      });
    }
  }

  async function buscarMovie(data, id) {
    const resultado = await firebaseBuscarMovie("movies", id);

    if (!resultado) {
      console.log('esta movie no existe en firebase la voy a crear...');
      firebaseGuardarMovie("movies", data);
      setMovie(data);
      setIsLoading(false);
    } else {
      setMovie(resultado);
      setIsLoading(false);
    }
  }

  const handleLikes = () => {
    if(movie) {
      let likes;
      let like = movie.likes;

      if(clicked === true) {
        likes = {
          likes: like +1
        }
        setMovie({...movie, ...likes})
        firebaseGuardarMovie("movies", {...movie, ...likes})
      }
    }
  }

  const editMovie = () => {
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
        <img width={320} height={474} src={imgUrl} alt={movie.title} />
      </div>

      <div className={`${styles.col} ${styles.details}`}>
        <h2>{movie.title} ({movie.release_date.substring(0,4)})</h2>

        <span className={styles.likes} onClick={() => {setClicked(true)}}>
          <button className={styles.likeBtn}>{clicked ? '🧡' : '🖤' }</button><span>{movie.likes}</span>
        </span>

        <h4>{movie.tagline}</h4>
        <p>{movie.overview}</p>

        <p className={styles.generos}>
          <span>Generos:</span> {movie.genres.map(genero => genero.name).join(', ')}
        </p>

        {movie.trailer ?
        <div className="trailer">
          <h3>Trailer</h3>
          <iframe width="100%" height="315" src={`https://www.youtube.com/embed/${movie.trailer}`} title="YouTube video player" allowfullscreen></iframe>
        </div>
        : ''
        }

        {movie.netflix ? <div className={styles.netflixHolder}><h3>Ver en Netflix</h3><div className={styles.netflix}><img src={netflix} width={24} alt='netflix' /><a href={movie.netflix}>Ver en Netflix</a></div></div> : ''}

        {movie.torrent ? <div className={styles.torrentHolder}><h3>Torrent</h3><div className={styles.torrent}><img src={torrent} width={24} alt='Torrent' /><a href={movie.torrent}>Descargar torrent</a></div></div> : ''}

        {movie.last_edited && movie.last_edited_time
        ? <span className={styles.lastEdit}>Ultima vez editado por {movie.last_edited} el {movie.last_edited_time}</span>
        : ''
        }
      </div>
    </div>
    <div className={styles.editbtn}><button onClick={() => editMovie()}>Editar</button></div>
    {edit === true && <MovieForm movie={movie} user={user} func={pull_data} />}
    </>
  )
}