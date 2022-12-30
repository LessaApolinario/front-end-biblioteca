import Post from '../../core/domain/models/Post'

import styles from '../styles/components/PostComponent.module.scss'

import Text from './Text'

interface PostComponentProps {
  data: Post
}

function PostComponent({ data }: PostComponentProps) {
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
    const date = data.created_at?.slice(0, 10)
    const time = data.created_at?.slice(11, 16)

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
      <h3>{data.user_name} <span className={styles.date}>{formatDate()}</span></h3>
      <h4 className={styles.postTitle}>{data.title}</h4>

      <Text
        className={'primary'}
        text={data.content ?? ''} />
    </article>
  )
}

export default PostComponent
