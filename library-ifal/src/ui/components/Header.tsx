import { ReactNode } from 'react'

import styles from '../styles/components/Header.module.scss'

interface HeaderProps {
  children: ReactNode
}

function Header({ children }: HeaderProps) {
  return (
    <header className={styles.container}>
      {children}
    </header>
  )
}

export default Header
