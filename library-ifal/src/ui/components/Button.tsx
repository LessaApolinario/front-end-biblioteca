import { ReactNode } from "react";

import styles from '../styles/components/Button.module.scss'

interface ButtonProps {
  children: ReactNode
  title?: string
  type?: 'button' | 'submit' | 'reset'
  btnType: 'primary' | 'secondary'
  onClick?(): void 
}

function Button({ children, title, type, btnType, onClick }: ButtonProps) {
  const className = `${styles.container} ${styles[btnType]}`

  return (
    <button
      title={title}
      className={className}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
