import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

import styles from '../styles/pages/HomePage.module.scss'

function HomePage() {
  const navigate = useNavigate()

  function redirectToBooks() {
    navigate('/books')
  }

  return (
    <main className={styles.container}>
      <h2>Bem-vindo</h2>
      <Button type='button' onClick={redirectToBooks}>Clique</Button>
    </main>
  )
}

export default HomePage
