import { useContext, useRef } from 'react'

import { GiTreeBranch } from 'react-icons/gi'

import { useNavigate } from 'react-router-dom'
import User from '../../core/domain/models/User'

import Button from '../components/Button'
import Input from '../components/Input'
import Label from '../components/Label'

import { AuthCTX } from '../contexts/AuthCTX'

import styles from '../styles/pages/RegisterPage.module.scss'

function RegisterPage() {
  const navigate = useNavigate()
  const nameRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const authCTX = useContext(AuthCTX)

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
      !name || !username || !email || !password ||
      !confirmedPassword || password !== confirmedPassword
    ) {
      return
    }

    const newUser = new User()
    newUser.name = name
    newUser.username = username
    newUser.email = email
    newUser.password = password

    await authCTX.register(newUser)

    navigate('/')
  }

  return (
    <div className={styles.container}>
      <GiTreeBranch />

      <form className={styles.register} onSubmit={handleRegister}>
        <h2>Cadastrar-se</h2>

        <div className={styles.row}>
          <div className={styles.name}>
            <Label text={'Seu nome'} />
            <Input type={'text'} name={'nome'} />
          </div>

          <div className={styles.username}>
            <Label text={'Nome de usuário'} />
            <Input type={'text'} name={'nome de usuário'} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.email}>
            <Label text={'Email'} />
            <Input type={'email'} name={'email'} />
          </div>

          <div className={styles.password}>
            <Label text={'Senha'} />
            <Input type={'password'} name={'senha'} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.confirmPassword}>
            <Label text={'Confirme sua senha'} />
            <Input type={'password'} name={'confirmação de senha'} />
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
