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
  const abbreviateMonth = (month: string) => {
    const abbreviatedMonths: Record<string, string> = {
      '01': "Ja",
      '02': "Fev",
      '03': "Mar",
      '04': "Abr",
      '05': "Maio",
      '06': "Jun",
      '07': "Jul",
      '08': "Ago",
      '09': "Set",
      '10': "Out",
      '11': "Nov",
      '12': "Dez"
    }

    return abbreviatedMonths[month] ?? 'Não existe um mês correspondente'
  }

  const formatDate = () => {
    const date = created_at?.slice(0, 10)
    const time = created_at?.slice(11, 16)

    if (date && time) {
      const [hours, minutes] = time?.split(':')
      const [year, month, day] = date.split('-')

      const abbreviatedMonth = abbreviateMonth(month)
      return `${abbreviatedMonth} ${day} ${year} às ${hours}:${minutes}`
    }

    return ''
  }
  
  return (
    <article className={styles.container}>
      <h3>{name} <span className={styles.date}>{formatDate()}</span></h3>
      <h4 className={styles.postTitle}>{title}</h4>
      
      <p className={styles.content}>{content}</p>
    </article>
  )
}

export default Post
