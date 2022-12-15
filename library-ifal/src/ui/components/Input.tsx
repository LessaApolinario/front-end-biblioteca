import { HTMLInputTypeAttribute } from 'react'

import styles from '../styles/components/Input.module.scss'

interface InputProps {
  type: HTMLInputTypeAttribute
  name: string | undefined
}

function Input(props: InputProps) {
  return <input
    type={props.type}
    className={styles.container}
    name={props.name} />
}

export default Input