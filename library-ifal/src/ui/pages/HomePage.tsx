import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { GiTreeBranch } from 'react-icons/gi'

import Button from "../components/Button";
import Header from "../components/Header";
import Post from "../components/Post";

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
  const formRef = useRef<HTMLFormElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const handleCreatePost = () => {
    console.log('post created')
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
          <div className={styles.images}>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={harry} alt="" />
              <p>Harry Potter e o cálice de fogo</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={Microcontrolador8051ComLinguagemC} alt="" />
              <p>Microcontrolador 8051 com Linguagem C</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={padroesdeprojeto} alt="" />
              <p>Use a cabeça!: padrões de projetos</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={AHoraDaEstrela} alt="" />
              <p>A hora da estrela</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={funcoes} alt="" />
              <p>Fundamentos de matemática elementar: Conjuntos e funções</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={_1984} alt="" />
              <p>1984</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={OAlienista} alt="" />
              <p>O alienista</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={PHP} alt="" />
              <p>Desenvolvendo Websites com PHP</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={Python} alt="" />
              <p>Introdução à prgramação com Python</p>
            </div>
          </div>
        </div>

        <h3>Área de posts</h3>
        
        <div className={styles.posts}>
          <div className={styles.search}>
            <Button
              type='button'
              btnType='secondary'
              onClick={handleCreatePost}
            >
              Escreva um post
            </Button>
          </div>

          <form action="#" ref={formRef} className={styles.form}>
            <div className={styles.postTitle}>
              <label>Título do post</label>
              <input type="text" ref={titleRef} />
            </div>

            <div className={styles.postContent}>
              <label>Conteúdo do post</label>
              <textarea cols={30} rows={10} ref={contentRef}></textarea>
            </div>

            <Button type='button' btnType='secondary'>Publicar post</Button>
          </form>

          <Post
            name='Lessa Apolinario'
            title='Sobre o atendimento'
            content='Muito bom o atendimento, sem demora e com agilidade'
            created_at='05/08/2022'
          />
          <Post
            name='Miguel Márcio'
            title='Sobre os livros'
            content='Nunca tinha encontrado um acervo tão rico e organizado'
            created_at='05/08/2022'
          />
        </div>
      </section>
    </main>
  )
}

export default HomePage
