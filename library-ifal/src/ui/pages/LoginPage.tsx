import { createRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { GiTreeBranch } from 'react-icons/gi'

import Button from '../components/Button'
import FlexWrapper from '../components/FlexWrapper'
import Input from '../components/Input'
import Label from '../components/Label'

import styles from '../styles/pages/LoginPage.module.scss'

import { useFields } from '../../hooks/useFields'
import { useAuth } from '../../hooks/useAuth'
import LinkComponent from '../components/LinkComponent'

function LoginPage() {
  const { validateAllInputs } = useFields()
  const { login } = useAuth()
  const navigate = useNavigate()
  const usernameRef = createRef<HTMLInputElement>()
  const passwordRef = createRef<HTMLInputElement>()

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const usernameInput = usernameRef.current
    const passwordInput = passwordRef.current
    const username = usernameInput?.value ?? ''
    const password = passwordInput?.value ?? ''

    validateAllInputs([usernameInput, passwordInput])
    await login({ username, password })
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

        <LinkComponent
          text={'Ainda não tem conta? Cadastre-se aqui'}
          to={'/register'} />
      </form>
    </div>
  )
}

export default LoginPage
