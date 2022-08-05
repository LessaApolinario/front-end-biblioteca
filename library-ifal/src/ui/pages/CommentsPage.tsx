import { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

import { GiTreeBranch } from 'react-icons/gi'

import api from "../../services/api";

import Button from '../components/Button';
import Header from "../components/Header";

import styles from '../styles/pages/CommentsPage.module.scss'

type Comment = {
  name: string
  email: string
  comment: string
}

function CommentsPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const comment = commentRef.current?.value
    
    if (name !== '' && email !== '' && comment !== '' 
      && name && email && comment) {
      const _comment: Comment = {
        name,
        email,
        comment
      }

      try {
        await api.post('/api/comments', JSON.stringify(_comment), {
          headers: {
            'Content-type': 'application/json'
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className={styles.container}>
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
      
      <div className={styles.presentation}>
        <h2>Contato</h2>
        <h3>Olá, querido visitante</h3>

        <p>
          Sinta-se livre para deixar uma mensagem sobre: dicas de como melhorar o site, ou mande seu livro, poema, 
          ou qualquer outra razão.
        </p>
      </div>

      <form action="#" className={styles.form} onSubmit={handleSubmit} ref={formRef}>
        <div className={styles.name}>
          <label>Seu nome <span>*</span></label>
          <input type="text" ref={nameRef} />
        </div>

        <div className={styles.email}>
          <label>Seu melhor email <span>*</span></label>
          <input type="email" ref={emailRef} />
        </div>

        <div className={styles.comment}>
          <label>Comentário <span>*</span></label>
          <textarea cols={30} rows={10} ref={commentRef}></textarea>
        </div>

        <Button type='submit' btnType='secondary'>Enviar</Button>
      </form>
    </div>
  )
}

export default CommentsPage
