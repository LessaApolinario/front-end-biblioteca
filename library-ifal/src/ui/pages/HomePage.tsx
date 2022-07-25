import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import { GiTreeBranch } from 'react-icons/gi'

import Button from "../components/Button";
import Header from "../components/Header";

import styles from '../styles/pages/HomePage.module.scss'

import harry from '../../assets/img/harry.jpg'

function HomePage() {
  const navigate = useNavigate()
  const itemsRef = useRef<HTMLDivElement>(null)

  function redirectToBooks() {
    navigate('/books')
  }

  const scroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const items = itemsRef.current
    
    if (items) {
      const isDivOrImg = 
        event.target instanceof HTMLDivElement || 
        event.target instanceof HTMLImageElement
      
      if (isDivOrImg) {
        if (event.deltaY > 0) {
          items.scrollBy(300, 0)
        } else if (event.deltaY < 0) {
          items.scrollBy(-300, 0)
        }
      }
    }
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
          <div className={styles.images} ref={itemsRef} onWheel={event => scroll(event)}>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={harry} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={harry} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={harry} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={harry} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={harry} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={harry} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={harry} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={harry} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={harry} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={harry} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={harry} alt="" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
