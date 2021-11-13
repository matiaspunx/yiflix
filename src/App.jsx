import styles from "./scss/App.module.scss"
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { MovieDetails } from "./pages/MovieDetails";
import { LandingPage } from "./pages/LandingPage";
import { MoviesGrid } from "./components/MoviesGrid";

export const App = () => {



  return (
    <BrowserRouter>
      <header>
        <Link to="/">
          <h1 className={styles.title}>Yiflix!</h1>
        </Link>
      </header>
      <nav className={styles.navigation}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/movies">Movies</Link>
      </nav>

      <main>

          <Routes>

            <Route path="/" element={<LandingPage />}>
              <Route path="" element={<MoviesGrid />}></Route>
              <Route path="movies" element={<MoviesGrid />}></Route>
              <Route path="movie">
                <Route path=":movieId" element={<MovieDetails />}></Route>
              </Route>
            </Route>
          </Routes>

      </main>
    </BrowserRouter>
  )
}
