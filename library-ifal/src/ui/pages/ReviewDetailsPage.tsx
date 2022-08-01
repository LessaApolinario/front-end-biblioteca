import { useNavigate } from "react-router-dom"

import Button from "../components/Button"
import Header from "../components/Header"

import styles from '../styles/pages/ReviewDetailsPage.module.scss'

function ReviewDetailsPage() {
  const navigate = useNavigate()
  const username = 'Lessa'
  const bookTitle = 'Core Java'
  const authorName = 'Algum autor'
  const review = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nihil maiores dolorum. Cupiditate, labore? Accusamus voluptatibus temporibus quam quae in illo praesentium mollitia, fuga pariatur ea nulla nihil tempore culpa. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab iusto repudiandae neque repellendus. Mollitia blanditiis quasi eaque vitae iure ab, autem commodi earum, dignissimos saepe quam incidunt repellat fuga sunt! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fugiat, laborum rerum qui exercitationem, molestias harum dolores culpa fuga, ex officia sapiente alias modi fugit voluptas quia voluptatem facilis doloribus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos iusto eius nostrum maiores molestias voluptas rem ducimus eos, hic nulla enim fuga magni alias ipsum in quia ratione delectus adipisci.'
  
  return (
    <div className={styles.container}>
      <Header>
        <Button
          type='button'
          btnType='secondary'
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
        
        <h2>Bem-vindo {username}</h2>
      </Header>

      <section className={styles.content}>
        <h3>Uma resenha de {username}</h3>
        <p>{bookTitle} de {authorName}</p>
        <p>{review}</p>
      </section>
    </div>
  )
}

export default ReviewDetailsPage
