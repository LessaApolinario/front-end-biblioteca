import { useNavigate } from "react-router-dom";

import { GiTreeBranch } from 'react-icons/gi'

import Button from "../components/Button";
import Header from "../components/Header";

import styles from '../styles/pages/HomePage.module.scss'

function HomePage() {
  const navigate = useNavigate()

  function redirectToBooks() {
    navigate('/books')
  }

  return (
    <main className={styles.container}>
      <Header>
        <GiTreeBranch />
        <Button type='button' onClick={redirectToBooks}>Acessar livros</Button>
      </Header>
      
      <section className={styles.content}>
        <h1>Bem-vindo</h1>
      </section>
    </main>
  )
}

export default HomePage
