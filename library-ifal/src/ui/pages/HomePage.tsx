import { useNavigate } from "react-router-dom";

import { GiTreeBranch } from 'react-icons/gi'

import Button from "../components/Button";
import Header from "../components/Header";

import styles from '../styles/pages/HomePage.module.scss'

import harry from '../../assets/img/harry.jpg'

function HomePage() {
  const navigate = useNavigate()

  function redirectToBooks() {
    navigate('/books')
  }

  return (
    <main className={styles.container}>
      <Header>
        <GiTreeBranch />
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/hints')}>Dicas</li>
          <li onClick={() => navigate('/contact')}>Contato</li>
        </ul>
        <Button type='button' onClick={redirectToBooks}>Acessar livros</Button>
      </Header>

      <section className={styles.content}>
        <h1>Bem-vindo</h1>

        <div className={styles.carrousel}>
          <div className={styles.images}>
            <img src={harry} alt="" />
            <img src={harry} alt="" />
            <img src={harry} alt="" />
            <img src={harry} alt="" />
            <img src={harry} alt="" />
            <img src={harry} alt="" />
            <img src={harry} alt="" />
            <img src={harry} alt="" />
            <img src={harry} alt="" />
            <img src={harry} alt="" />
            <img src={harry} alt="" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
