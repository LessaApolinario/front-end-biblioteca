import { useRef } from 'react'

import { GiTreeBranch } from 'react-icons/gi'

import { useNavigate } from 'react-router-dom'

import User from '../../core/models/User'

import api from '../../services/api'

import Button from '../components/Button'

import styles from '../styles/pages/RegisterPage.module.scss'

function RegisterPage() {
  const navigate = useNavigate()
  const nameRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()
    const nameInput = nameRef.current
    const usernameInput = usernameRef.current
    const emailInput = emailRef.current
    const passwordInput = passwordRef.current
    const confirmPasswordInput = confirmPasswordRef.current
    
    const name = nameInput?.value
    const username = usernameInput?.value
    const email = emailInput?.value
    const password = passwordInput?.value
    const confirmedPassword = confirmPasswordInput?.value

    if (
      name !== '' && 
      username !== '' && 
      email !== '' && 
      password !== '' && 
      confirmedPassword !== '' && 
      password === confirmedPassword
    ) {
      const user: User = {
        name,
        username,
        email,
        password
      }

      const response = await api.post('/api/auth/register', user)
      const { data } = response
      console.log(data)
    }
  }

  return (
    <div className={styles.container}>
      <GiTreeBranch />

      <form className={styles.register} onSubmit={handleRegister}>
        <h2>Cadastrar-se</h2>

        <div className={styles.row}>
          <div className={styles.name}>
            <label>Seu nome</label>
            <input type="text" ref={nameRef} />
          </div>

          <div className={styles.username}>
            <label>Nome de usuário</label>
            <input type="text" ref={usernameRef} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.email}>
            <label>Email</label>
            <input type="email" ref={emailRef} />
          </div>

          <div className={styles.password}>
            <label>Senha</label>
            <input type="password" ref={passwordRef} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.confirmPassword}>
            <label>Confirme sua senha</label>
            <input type="password" ref={confirmPasswordRef} />
          </div>

          <Button type='submit' btnType='secondary'>Cadastrar</Button>
        </div>

        <p className={styles.link}>
          Já tem conta? Entre 
          <span onClick={() => navigate('/login')}>aqui</span>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
