import { ReactNode } from "react";

import styles from '../styles/components/Button.module.scss'

interface ButtonProps {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?(): void 
}

function Button({ children, type, onClick }: ButtonProps) {
  return (
    <button
      className={styles.container}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
