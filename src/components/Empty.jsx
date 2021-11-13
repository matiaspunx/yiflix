import styles from '../scss/Empty.module.scss'

export const Empty = () => {
  return (
    <div className={styles.empty}>
      No se encontró ninguna pelicula...
    </div>
  )
}
