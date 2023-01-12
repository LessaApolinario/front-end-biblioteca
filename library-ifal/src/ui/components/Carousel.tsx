import { useNavigate } from 'react-router-dom';

import harry from '../../assets/img/harry.jpg';
import Microcontrolador8051ComLinguagemC from '../../assets/img/Microcontrolador8051ComLinguagemC.jpg';
import padroesdeprojeto from '../../assets/img/padroesdeprojeto.jpg';
import AHoraDaEstrela from '../../assets/img/AHoraDaEstrela.jpg';
import funcoes from '../../assets/img/funcoes.jpg';
import _1984 from '../../assets/img/_1984.jpg';
import OAlienista from '../../assets/img/OAlienista.jpeg';
import PHP from '../../assets/img/PHP.jpg';
import Python from '../../assets/img/Python.jpg';

import styles from '../styles/components/Carousel.module.scss';

function Carousel() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.images}>
        <div className={styles.item}>
          <img onClick={() => navigate('/books')} src={harry} alt="" />
          <p>Harry Potter e o cálice de fogo</p>
        </div>
        <div className={styles.item}>
          <img
            onClick={() => navigate('/books')}
            src={Microcontrolador8051ComLinguagemC}
            alt=""
          />
          <p>Microcontrolador 8051 com Linguagem C</p>
        </div>
        <div className={styles.item}>
          <img
            onClick={() => navigate('/books')}
            src={padroesdeprojeto}
            alt=""
          />
          <p>Use a cabeça!: padrões de projetos</p>
        </div>
        <div className={styles.item}>
          <img onClick={() => navigate('/books')} src={AHoraDaEstrela} alt="" />
          <p>A hora da estrela</p>
        </div>
        <div className={styles.item}>
          <img onClick={() => navigate('/books')} src={funcoes} alt="" />
          <p>Fundamentos de matemática elementar: Conjuntos e funções</p>
        </div>
        <div className={styles.item}>
          <img onClick={() => navigate('/books')} src={_1984} alt="" />
          <p>1984</p>
        </div>
        <div className={styles.item}>
          <img onClick={() => navigate('/books')} src={OAlienista} alt="" />
          <p>O alienista</p>
        </div>
        <div className={styles.item}>
          <img onClick={() => navigate('/books')} src={PHP} alt="" />
          <p>Desenvolvendo Websites com PHP</p>
        </div>
        <div className={styles.item}>
          <img onClick={() => navigate('/books')} src={Python} alt="" />
          <p>Introdução à prgramação com Python</p>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
