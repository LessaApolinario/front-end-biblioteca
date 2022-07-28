import { GiTreeBranch } from 'react-icons/gi'
import Button from '../components/Button'

import styles from '../styles/pages/LoginPage.module.scss'

function LoginPage() {
  return (
    <div className={styles.container}>
      <GiTreeBranch />
      
      <form className={styles.login}>
        <h2>Fazer login</h2>

        <div className={styles.username}>
          <label>Nome de usuário</label>
          <input type="text" />
        </div>

        <div className={styles.password}>
          <label>Senha</label>
          <input type="text" />
        </div>

        <Button type='submit' btnType='secondary'>Entrar</Button>
      </form>
    </div>
  )
}

export default LoginPage
