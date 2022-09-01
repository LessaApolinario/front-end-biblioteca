import { ReactNode } from 'react'

import styles from '../styles/components/Hint.module.scss'

interface HintProps {
  title: string
  children: ReactNode
}

function Hint({ title, children }: HintProps) {
  return (
    <section className={styles.container}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export default Hint
