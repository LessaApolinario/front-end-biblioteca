import { createRef } from 'react'

import { GiTreeBranch } from 'react-icons/gi'

import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'
import FlexWrapper from '../components/FlexWrapper'
import Input from '../components/Input'
import Label from '../components/Label'

import styles from '../styles/pages/RegisterPage.module.scss'

import { UserPartial, useAuth } from '../../hooks/useAuth'
import { useInput } from '../../hooks/useInput'

function RegisterPage() {
  const { validateAll, checkEqualFields } = useInput()
  const { register } = useAuth()
  const navigate = useNavigate()
  const nameRef = createRef<HTMLInputElement>()
  const usernameRef = createRef<HTMLInputElement>()
  const emailRef = createRef<HTMLInputElement>()
  const passwordRef = createRef<HTMLInputElement>()
  const confirmPasswordRef = createRef<HTMLInputElement>()

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()
    const nameInput = nameRef.current
    const usernameInput = usernameRef.current
    const emailInput = emailRef.current
    const passwordInput = passwordRef.current
    const confirmPasswordInput = confirmPasswordRef.current

    validateAll([
      nameInput,
      usernameInput,
      emailInput,
      passwordInput,
      confirmPasswordInput
    ])
    checkEqualFields(passwordInput, confirmPasswordInput)

    const userPartial: UserPartial = {
      name: nameInput?.value,
      username: usernameInput?.value,
      email: emailInput?.value,
      password: passwordInput?.value,
    }

    await register(userPartial)
  }

  return (
    <div className={styles.container}>
      <GiTreeBranch />

      <form className={styles.register} onSubmit={handleRegister}>
        <h2>Cadastrar-se</h2>

        <FlexWrapper className={styles.row} orientation={'row'}>
          <FlexWrapper className={styles.name} orientation={'column'}>
            <Label text={'Seu nome'} />
            <Input type={'text'} name={'nome'} ref={nameRef} />
          </FlexWrapper>

          <FlexWrapper className={styles.username} orientation={'column'}>
            <Label text={'Nome de usuário'} />
            <Input type={'text'} name={'nome de usuário'} ref={usernameRef} />
          </FlexWrapper>
        </FlexWrapper>

        <FlexWrapper className={styles.row} orientation={'row'}>
          <FlexWrapper className={styles.email} orientation={'column'}>
            <Label text={'Email'} />
            <Input type={'email'} name={'email'} ref={emailRef} />
          </FlexWrapper>

          <FlexWrapper className={styles.password} orientation={'column'}>
            <Label text={'Senha'} />
            <Input type={'password'} name={'senha'} ref={passwordRef} />
          </FlexWrapper>
        </FlexWrapper>

        <FlexWrapper className={styles.row} orientation={'row'}>
          <FlexWrapper className={styles.confirmPassword} orientation={'column'}>
            <Label text={'Confirme sua senha'} />
            <Input type={'password'} name={'confirmação de senha'} ref={confirmPasswordRef} />
          </FlexWrapper>

          <Button type='submit' btnType='secondary'>Cadastrar</Button>
        </FlexWrapper>

        <p className={styles.link}>
          Já tem conta? Entre
          <span onClick={() => navigate('/login')}>aqui</span>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
