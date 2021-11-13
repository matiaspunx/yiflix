import styles from '../scss/Search.module.scss'
import { FaSearch } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';

export const Search = () => {
  const navigate = useNavigate();

  const query = useQuery();
  const search = query.get("search")

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <div className={styles.searchBox}>
        <input type="text"
        placeholder="¿Qué peli estás buscando?"
        aria-label="Search Movies"
        value={search ?? ''}
        onChange={(e) => {
          const value = e.target.value;
          navigate('/?search=' + value);
        }} />
        <FaSearch size={16} className={styles.searchIcon} />
      </div>
    </form>
  )
}
