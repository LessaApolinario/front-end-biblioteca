import { GiTreeBranch } from 'react-icons/gi'

import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'

import styles from '../styles/pages/LoginPage.module.scss'

function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <GiTreeBranch />

      <form className={styles.login}>
        <h2>Fazer login</h2>

        <div className={styles.email}>
          <label>Email</label>
          <input type="text" />
        </div>

        <div className={styles.password}>
          <label>Senha</label>
          <input type="text" />
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
