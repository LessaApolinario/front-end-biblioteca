import { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { GiTreeBranch } from 'react-icons/gi'

import Button from '../components/Button'
import Input from '../components/Input'
import Label from '../components/Label'

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

    try {
      if (username && password) {
        const success = await authCTX.login({ username, password })
        
        if (success) {
          navigate('/')
        }
      }
    } catch(error) {
      console.log(`Erro ao fazer login: ${error}`)
    }
  }

  return (
    <div className={styles.container}>
      <GiTreeBranch />

      <form className={styles.login} onSubmit={handleSubmit}>
        <h2>Fazer login</h2>

        <div className={styles.username}>
          <Label text={'Nome de usuário'} />
          <Input type={'text'} name={'nome de usuário'} />
        </div>

        <div className={styles.password}>
          <Label text={'Senha'} />
          <Input type={'password'} name={'senha'} />
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
