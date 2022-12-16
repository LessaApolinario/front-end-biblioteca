import { createRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { GiTreeBranch } from 'react-icons/gi'

import Button from '../components/Button'
import FlexWrapper from '../components/FlexWrapper'
import Input from '../components/Input'
import Label from '../components/Label'

import styles from '../styles/pages/LoginPage.module.scss'

import { AuthCTX } from '../contexts/AuthCTX'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useInput } from '../../hooks/useInput'

function LoginPage() {
  const useUsernameInput = useInput()
  const usePasswordInput = useInput()
  const navigate = useNavigate()
  const usernameRef = createRef<HTMLInputElement>()
  const passwordRef = createRef<HTMLInputElement>()
  const authCTX = useContext(AuthCTX)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const usernameInput = usernameRef.current
    const passwordInput = passwordRef.current
    const username = usernameInput?.value ?? ''
    const password = passwordInput?.value ?? ''

    try {
      useUsernameInput.validate(usernameInput)
      usePasswordInput.validate(passwordInput)

      const success = await authCTX.login({ username, password })

      if (success) {
        toast.success('Login realizado com sucesso!', {
          position: toast.POSITION.TOP_RIGHT,
        })
        navigate('/')
      }
    } catch (error) {
      toast.error(`Erro ao fazer login`, {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  return (
    <div className={styles.container}>
      <GiTreeBranch />

      <form className={styles.login} onSubmit={handleSubmit}>
        <h2>Fazer login</h2>

        <FlexWrapper className={styles.username} orientation={'column'}>
          <Label text={'Nome de usuário'} />
          <Input type={'text'} name={'nome de usuário'} ref={usernameRef} />
        </FlexWrapper>

        <FlexWrapper className={styles.password} orientation={'column'}>
          <Label text={'Senha'} />
          <Input type={'password'} name={'senha'} ref={passwordRef} />
        </FlexWrapper>

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
