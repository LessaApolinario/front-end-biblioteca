import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import { GiTreeBranch } from 'react-icons/gi'

import Button from "../components/Button";
import Header from "../components/Header";

import styles from '../styles/pages/HomePage.module.scss'

import harry from '../../assets/img/harry.jpg'
import Microcontrolador8051ComLinguagemC from '../../assets/img/Microcontrolador8051ComLinguagemC.jpg' 
import padroesdeprojeto from '../../assets/img/padroesdeprojeto.jpg'
import AHoraDaEstrela from '../../assets/img/AHoraDaEstrela.jpg'
import funcoes from '../../assets/img/funcoes.jpg'
import _1984 from '../../assets/img/_1984.jpg'
import OAlienista from '../../assets/img/OAlienista.jpeg'
import PHP from '../../assets/img/PHP.jpg'
import Python from '../../assets/img/Python.jpg'

function HomePage() {
  const navigate = useNavigate()
  const itemsRef = useRef<HTMLDivElement>(null)

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
          <li onClick={() => navigate('/synopsis')}>Sinopses</li>
          <li onClick={() => navigate('/books')}>Livros</li>
          <li onClick={() => navigate('/reviews')}>Resenhas</li>
          <li onClick={() => navigate('/hints')}>Dicas</li>
          <li onClick={() => navigate('/contact')}>Contato</li>
        </ul>

        <div className={styles.buttons}>
          <Button
            type='button'
            btnType='secondary'
            onClick={() => navigate('/login')}
          >
            Entrar
          </Button>
          <Button
            type='button'
            btnType='secondary'
            onClick={() => navigate('/register')}
          >
            Cadastrar-se
          </Button>
        </div>
      </Header>

      <section className={styles.content}>
        <h1>Bem-vindo</h1>

        <div className={styles.carrousel}>
          <div className={styles.images} ref={itemsRef} onWheel={event => scroll(event)}>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={harry} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={Microcontrolador8051ComLinguagemC} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={padroesdeprojeto} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={AHoraDaEstrela} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={funcoes} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={_1984} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={OAlienista} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={PHP} alt="" />
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={Python} alt="" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
