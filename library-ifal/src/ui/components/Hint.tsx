import styles from '../styles/components/Hint.module.scss'

interface HintProps {
  title: string
  content: string
}

function Hint({ title, content }: HintProps) {
  return (
    <section className={styles.container}>
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  )
}

export default Hint
