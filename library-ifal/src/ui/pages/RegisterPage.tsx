import { GiTreeBranch } from 'react-icons/gi'

import { useNavigate } from 'react-router-dom'

import Button from '../components/Button'

import styles from '../styles/pages/RegisterPage.module.scss'

function RegisterPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <GiTreeBranch />

      <form className={styles.register}>
        <h2>Cadastrar-se</h2>

        <div className={styles.name}>
          <label>Seu nome</label>
          <input type="text" />
        </div>
        
        <div className={styles.username}>
          <label>Nome de usuário</label>
          <input type="text" />
        </div>

        <div className={styles.password}>
          <label>Senha</label>
          <input type="text" />
        </div>

        <div className={styles.confirmPassword}>
          <label>Confirme sua senha</label>
          <input type="text" />
        </div>

        <Button type='submit' btnType='secondary'>Cadastrar</Button>

        <p className={styles.link}>
          Já tem conta? Entre 
          <span onClick={() => navigate('/login')}>aqui</span>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
