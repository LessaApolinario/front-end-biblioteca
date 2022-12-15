import styles from '../styles/components/Label.module.scss'

interface LabelProps {
  text: string
  htmlFor?: string
}

function Label(props: LabelProps) {
  return <label
    className={styles.container}
    htmlFor={props.htmlFor}>{props.text}</label>
}

export default Label
