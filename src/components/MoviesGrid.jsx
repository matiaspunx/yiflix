import styles from '../scss/MovieGrid.module.scss'

import { MovieItem } from './MovieItem'
import { Spinner } from '../components/Spinner';

import { useEffect, useState } from 'react'
import { get } from '../utils/httpClient';

import InfiniteScroll from 'react-infinite-scroll-component';

import { useOutletContext } from '../pages/LandingPage';
import { Empty } from './Empty';

export const MoviesGrid = (props) => {
  let search = useOutletContext();

  // manejo chori porque el outlet necesita si o si un contexto valido
  if(search === 999999) {
    search = '';
  }

  //const search = 'Avengers';
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    document.body.style = 'background-image: url();';
    document.body.className = '';
  }, [page]);

  useEffect(() => {
    setIsLoading(true);
    const searchUrl = search
    ? '/search/movie?query='+ search + '&page=' + page
    : '/discover/movie?page=' + page
    get(searchUrl).then(data => {
      setMovies((prevMovies) => prevMovies.concat(data.results));
      setHasMore(data.page < data.total_pages);
      setIsLoading(false);
    })
  }, [search, page])

  if(!isLoading && movies.length === 0) {
    return <Empty />
  }

  return (
    <InfiniteScroll dataLength={movies.length} hasMore={hasMore}  next={() => setpage((prevPage) => prevPage + 1)} loader={<Spinner />}>
      <ul className={styles.moviesGrid}>
        {movies.map(movie =>
          <MovieItem key={movie.id} movie={movie} />
        )}
      </ul>
    </InfiniteScroll>
  )
}