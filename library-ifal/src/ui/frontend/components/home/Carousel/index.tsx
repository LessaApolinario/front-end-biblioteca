import harry from '../../../../../assets/img/harry.jpg';
import AHoraDaEstrela from '../../../../../assets/img/AHoraDaEstrela.jpg';
import Microcontrolador8051ComLinguagemC from '../../../../../assets/img/Microcontrolador8051ComLinguagemC.jpg';
import OAlienista from '../../../../../assets/img/OAlienista.jpeg';
import PHP from '../../../../../assets/img/PHP.jpg';
import Python from '../../../../../assets/img/Python.jpg';
import _1984 from '../../../../../assets/img/_1984.jpg';
import funcoes from '../../../../../assets/img/funcoes.jpg';
import padroesdeprojeto from '../../../../../assets/img/padroesdeprojeto.jpg';

import CarouselCard from '../../CarouselCard';
import styles from './styles.module.scss';

interface CarouselCardProps {
  to?: string;
  src?: string;
  text: string;
}

function Carousel() {
  const carouselCardData: CarouselCardProps[] = [
    {
      src: harry,
      text: 'Harry Potter e o cálice de fogo',
    },
    {
      src: Microcontrolador8051ComLinguagemC,
      text: 'Microcontrolador 8051 com Linguagem C',
    },
    {
      src: padroesdeprojeto,
      text: 'Use a cabeça!: padrões de projetos',
    },
    { src: AHoraDaEstrela, text: 'A hora da estrela' },
    {
      src: funcoes,
      text: 'Fundamentos de matemática elementar: Conjuntos e funções',
    },
    { src: _1984, text: '1984' },
    { src: OAlienista, text: 'O alienista' },
    { src: PHP, text: 'Desenvolvendo Websites com PHP' },
    { src: Python, text: 'Introdução à prgramação com Python' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.images}>
        {carouselCardData.map(({ to, src, text }) => {
          return (
            <CarouselCard key={`${src + text}`} to={to} src={src} text={text} />
          );
        })}
      </div>
    </div>
  );
}

export { Carousel };
