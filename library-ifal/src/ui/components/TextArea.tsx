import styles from '../styles/components/TextArea.module.scss'

interface TextAreaProps {
  name: string
  id: string
  cols: number
  rows: number
}

function TextArea(props: TextAreaProps) {
  return <textarea
    className={styles.container}
    name={props.name}
    id={props.id}
    cols={props.cols}
    rows={props.rows}></textarea>
}

export default TextArea
