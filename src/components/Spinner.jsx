import { FaSpinner } from "react-icons/fa";
import styles from '../scss/Spinner.module.scss'

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <FaSpinner size={60} className={styles.spinning}></FaSpinner>
    </div>
  )
}
