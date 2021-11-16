import styles from "./scss/App.module.scss"
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { MovieDetails } from "./pages/MovieDetails";
import { LandingPage } from "./pages/LandingPage";
import { MoviesGrid } from "./components/MoviesGrid";

import firebaseApp from "./utils/FirebaseCredenciales";
import { onAuthStateChanged, getAuth, signOut } from "@firebase/auth";
import { firebaseGoogleLogin } from './utils/FirebaseUtils';

const auth = getAuth(firebaseApp);

export const App = () => {

const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if(usuarioFirebase) {
      //si hay user
      setUsuarioGlobal(usuarioFirebase);
    } else {
      // si no hay user
      setUsuarioGlobal(null);
    }
  })

  return (
    <BrowserRouter>
      <header>
        <Link to="/">
          <h1 className={styles.title}>Yiflix!</h1>
        </Link>
      </header>
      <nav className={styles.navigation}>
        <Link to="/">Home</Link> |{" "}

        {usuarioGlobal
        ? <span>&nbsp;Hola, {usuarioGlobal.displayName} <button onClick={() => signOut(auth)}>Salir</button></span>
        : <button onClick={firebaseGoogleLogin}>Login</button>}
      </nav>

      <main>

          <Routes>
            <Route path="/" element={<LandingPage />}>
              <Route path="" element={<MoviesGrid />}></Route>
              <Route path="movies" element={<MoviesGrid />}></Route>
              <Route path="movie">
                <Route path=":movieId" element={<MovieDetails user={usuarioGlobal} />} />
              </Route>
            </Route>
          </Routes>

      </main>
    </BrowserRouter>
  )
}
