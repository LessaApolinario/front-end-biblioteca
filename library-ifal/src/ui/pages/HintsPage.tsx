import { useNavigate } from 'react-router-dom'

import { GiTreeBranch } from 'react-icons/gi'

import Button from '../components/Button'
import Header from '../components/Header'
import Hint from '../components/Hint'

import styles from '../styles/pages/HintsPage.module.scss'

function HintsPage() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <Header>
        <GiTreeBranch />

        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/books')}>Livros</li>
          <li onClick={() => navigate('/reviews')}>Resenhas</li>
          <li onClick={() => navigate('/hints')}>Dicas</li>
          <li onClick={() => navigate('/contact')}>Contato</li>
        </ul>

        <Button
          type='button'
          btnType='secondary'
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </Header>

      <h3>Sobre a Biblioteca</h3>

      <div className={styles.hintsContainer}>
        <Hint title='Reserva de livros'>
          <p>
            Os alunos só podem fazer a reserva de algum livro, caso o livro que ele desejar não tiver nenhum exemplar disposto para o empréstimo.
          </p>
          <p>
            Após o aluno reservar o livro, quando algum exemplar estiver disponível sera separado para ele.
          </p>
        </Hint>
        <Hint title='Empréstimo'>
          <p>
            Para o aluno realizar algum emprestimo de um livro, é necessario que o mesmo tenha cadastro na biblioteca.
          </p>
          <p>
            Pode ser feito no setor da biblioteca ou pelo site da instituição (SIGAA)
          </p>
        </Hint>
        <Hint title='Sobre a renovação de empréstimo'>
          <p>Os alunos podem fazer a renovação de empréstimo por meio do SIGAA</p>

          <h3>Observações</h3>

          <p>
            Alunos de graduação podem renovar 3 vezes o empréstimo e cada empréstimo tem um prazo de 15 dias.
          </p>

          <p>
            Alunos do Técnico podem renovar 3 vezes o empréstimo e cada empréstimo tem um prazo de 7 dias.
          </p>
        </Hint>
      </div>
    </div>
  )
}

export default HintsPage
