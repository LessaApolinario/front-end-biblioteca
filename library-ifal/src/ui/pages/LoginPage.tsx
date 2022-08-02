import { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { GiTreeBranch } from 'react-icons/gi'

import User from '../../core/models/User'

import Button from '../components/Button'

import styles from '../styles/pages/LoginPage.module.scss'
import { AuthCTX } from '../contexts/AuthCTX'

function LoginPage() {
  const navigate = useNavigate()
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const authCTX = useContext(AuthCTX)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const username = usernameRef.current?.value
    const password = passwordRef.current?.value

    const user: User = {
      username,
      password
    }

    authCTX.login(user)
  }

  return (
    <div className={styles.container}>
      <GiTreeBranch />

      <form className={styles.login} onSubmit={handleSubmit}>
        <h2>Fazer login</h2>

        <div className={styles.username}>
          <label>Nome de usuário</label>
          <input type="text" ref={usernameRef} />
        </div>

        <div className={styles.password}>
          <label>Senha</label>
          <input type="text" ref={passwordRef} />
        </div>

        <Button type='submit' btnType='secondary'>Entrar</Button>

        <p className={styles.link}>
          Ainda não tem conta? Cadastre-se 
          <span onClick={() => navigate('/register')}>aqui</span>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
