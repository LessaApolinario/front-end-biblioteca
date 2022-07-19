import { ReactNode } from "react";

import styles from '../styles/components/Button.module.scss'

interface ButtonProps {
  children: ReactNode
  title?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?(): void 
}

function Button({ children, title, type, onClick }: ButtonProps) {
  return (
    <button
      title={title}
      className={styles.container}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
