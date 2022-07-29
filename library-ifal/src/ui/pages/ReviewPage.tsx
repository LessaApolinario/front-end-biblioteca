import BookDTO from '../../core/dto/BookDTO'
import User from '../../core/models/User'
import Button from '../components/Button'

import Review from '../components/Review'

import styles from '../styles/pages/ReviewPage.module.scss'

function ReviewPage() {
  const user: User = {
    username: 'Lessa',
    password: 'asfknjjkashfjasdf' 
  }

  const book: BookDTO = {
    ano: '2011',
    autor: 'Algum autor',
    edicao: 'dfsdfsdf',
    localizacao: 'kdkdkdkdk',
    titulo: 'Core Java'    
  }

  return (
    <div className={styles.container}>
      <h2>Resenhas</h2>

      <form action="#" method='POST' className={styles.form}>
        <h3>Escreva sua resenha</h3>

        <div className={styles.book}>
          <label>Livro</label>
          <input type="text" />
        </div>

        <div className={styles.author}>
          <label>Autor</label>
          <input type="text" />
        </div>
        
        <div className={styles.review}>
          <label>Resenha</label>
          <textarea cols={30} rows={5}></textarea>
        </div>

        <Button type='button' btnType='secondary'>Escrever</Button>
      </form>
      <div className={styles.reviews}>
        <Review
          user={user}
          key={12312312}
          book={book}
          review={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laudantium provident harum porro quod modi nisi iste quia consequuntur recusandae adipisci temporibus, earum incidunt unde. Necessitatibus libero cum voluptatum dicta?'}
        />

        <Review
          user={user}
          key={12312312}
          book={book}
          review={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laudantium provident harum porro quod modi nisi iste quia consequuntur recusandae adipisci temporibus, earum incidunt unde. Necessitatibus libero cum voluptatum dicta?'}
        />

        <Review
          user={user}
          key={12312312}
          book={book}
          review={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laudantium provident harum porro quod modi nisi iste quia consequuntur recusandae adipisci temporibus, earum incidunt unde. Necessitatibus libero cum voluptatum dicta?'}
        />

        <Review
          user={user}
          key={12312312}
          book={book}
          review={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laudantium provident harum porro quod modi nisi iste quia consequuntur recusandae adipisci temporibus, earum incidunt unde. Necessitatibus libero cum voluptatum dicta?'}
        />

        <Review
          user={user}
          key={12312312}
          book={book}
          review={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laudantium provident harum porro quod modi nisi iste quia consequuntur recusandae adipisci temporibus, earum incidunt unde. Necessitatibus libero cum voluptatum dicta?'}
        />

        <Review
          user={user}
          key={12312312}
          book={book}
          review={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laudantium provident harum porro quod modi nisi iste quia consequuntur recusandae adipisci temporibus, earum incidunt unde. Necessitatibus libero cum voluptatum dicta?'}
        />

        <Review
          user={user}
          key={12312312}
          book={book}
          review={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laudantium provident harum porro quod modi nisi iste quia consequuntur recusandae adipisci temporibus, earum incidunt unde. Necessitatibus libero cum voluptatum dicta?'}
        />

        <Review
          user={user}
          key={12312312}
          book={book}
          review={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laudantium provident harum porro quod modi nisi iste quia consequuntur recusandae adipisci temporibus, earum incidunt unde. Necessitatibus libero cum voluptatum dicta?'}
        />

        <Review
          user={user}
          key={12312312}
          book={book}
          review={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laudantium provident harum porro quod modi nisi iste quia consequuntur recusandae adipisci temporibus, earum incidunt unde. Necessitatibus libero cum voluptatum dicta?'}
        />

        <Review
          user={user}
          key={12312312}
          book={book}
          review={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laudantium provident harum porro quod modi nisi iste quia consequuntur recusandae adipisci temporibus, earum incidunt unde. Necessitatibus libero cum voluptatum dicta?'}
        />

        <Review
          user={user}
          key={12312312}
          book={book}
          review={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laudantium provident harum porro quod modi nisi iste quia consequuntur recusandae adipisci temporibus, earum incidunt unde. Necessitatibus libero cum voluptatum dicta?'}
        />

        <Review
          user={user}
          key={12312312}
          book={book}
          review={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum laudantium provident harum porro quod modi nisi iste quia consequuntur recusandae adipisci temporibus, earum incidunt unde. Necessitatibus libero cum voluptatum dicta?'}
        />
      </div>
    </div>
  )
}

export default ReviewPage
