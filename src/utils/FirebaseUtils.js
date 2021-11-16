import firebaseApp from './FirebaseCredenciales';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider
} from 'firebase/auth';

import { collection, getDocs, setDoc, doc, getFirestore, query, where } from 'firebase/firestore';

//import { v4 as uuidv4 } from 'uuid';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export async function firebaseRegistrarUsuario(email, password) {
  let credenciales = await createUserWithEmailAndPassword(auth, email, password)
}

export async function firebaseLogin(email, password) {
  try {
    let credenciales = await signInWithEmailAndPassword(auth, email, password)
    //credenciales.user
  } catch (error) {
    return false;
  }

  return true;
}

export async function firebaseGoogleLogin() {
  try {
    let credenciales = await signInWithRedirect(auth, provider)
    //credenciales.user
  } catch (error) {
    return false;
  }

  return true;
}

// peliculas
export async function firebaseBuscarMovie(coleccion, id) {
  let newMovie;
  let consulta = collection(firestore, coleccion)

  const q = query(consulta, where("imdb_id", "==", id));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    let res = doc.data();
    console.log('Esta movie ya existe en Firebase');
    if(res) {
      newMovie = res;
    }
  });

  return newMovie;
}

export async function firebaseGuardarMovie(coleccion, objeto) {
  let ref = doc(firestore, coleccion, objeto.imdb_id)
  await setDoc(ref, objeto);
}
//peliculas