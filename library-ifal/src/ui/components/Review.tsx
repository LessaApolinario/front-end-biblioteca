import { useEffect, useRef } from 'react'

import styles from '../styles/components/Review.module.scss'

interface ReviewProps {
  name: string
  title_book: string
  writer: string
  review: string
  created_at?: string
  onClick?(): void
}

function Review({ name, title_book, writer, review, created_at, onClick }: ReviewProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null)
 
  useEffect(() => {
    const paragraph = paragraphRef.current

    if (paragraph) {
      if (
        (paragraph.textContent?.length && 
        paragraph.textContent?.length >= 500) || 
        !paragraph.textContent?.includes(' ')
      ) {
        paragraph.classList.add(`${styles['hiddenText']}`)
      }
    }
  }, [])

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
      <h3>{name} sobre {title_book} de {writer}:</h3>

      <p
        className={styles.review}
        title='Clique para ver detalhes da resenha'
        ref={paragraphRef}
        onClick={onClick}
      >
        {review}
      </p>

      <p className={styles.date}>
        {formatDate()}
      </p>
    </article>
  )
}

export default Review
