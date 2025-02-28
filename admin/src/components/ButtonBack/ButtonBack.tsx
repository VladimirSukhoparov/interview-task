import { useNavigate } from "react-router-dom"
import styles from './ButtonBack.module.css'


export const ButtonBack = () => {
    const navigate = useNavigate()

    const navigateToBack = () => {
        navigate('/')
    }
  return (
    <div className={styles.title} onClick={navigateToBack}>
    <span
      className={`${styles.chevron}`}></span>
      Back
  </div>
  )
}

export default ButtonBack