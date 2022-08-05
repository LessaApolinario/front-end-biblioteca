import styles from '../styles/components/Post.module.scss'

interface PostProps {
  name?: string
  title: string
  content: string
  user_id?: string
  created_at?: string
  updated_at?: string
}

function Post({ name, title, content, created_at }: PostProps) {
  return (
    <article className={styles.container}>
      <h3>{name} <span className={styles.date}>{created_at}</span></h3>
      <h4 className={styles.postTitle}>{title}</h4>
      
      <p className={styles.content}>{content}</p>

      
    </article>
  )
}

export default Post
