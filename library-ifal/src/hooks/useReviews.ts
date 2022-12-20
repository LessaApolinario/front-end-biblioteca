import { useEffect, useState } from 'react'

import Review from '../core/domain/models/Review'

import ReviewService from '../services/ReviewService'

import { useAuth } from './useAuth'
import { useNotifications } from './useNotifications'

export function useReviews() {
  const { isAuthenticated } = useAuth()
  const { notifySuccess, notifyError } = useNotifications()
  const [data, setData] = useState<Review[]>()

  useEffect(() => {
    async function loadReviews() {
      await fetchReviews()
    }

    return () => {
      loadReviews()
    }
  }, [data])

  async function fetchReviews(): Promise<void> {
    try {
      const reviewService = new ReviewService()
      const reviews = await reviewService.fetch()
      const isEmpty = !reviews?.length

      if (!isEmpty) {
        setData(reviews)
        notifySuccess('Resenhas listadas com sucesso!')
      }
    } catch (error) {
      notifyError('Erro ao listar resenhas')
    }
  }

  async function createReview(review: Review) {
    if (!isAuthenticated) {
      throw new Error('Aviso: é preciso estar logado para criar mensagens.')
    }

    try {
      const reviewService = new ReviewService()
      await reviewService.create(review)
      notifySuccess('Resenha criada com sucesso!')
    } catch (error) {
      notifyError('Erro ao adicionar resenha')
    }
  }

  async function searchReview(query: string) {
    try {
      const reviewService = new ReviewService()
      const reviews = await reviewService.search(query)
      const isEmpty = !reviews.length

      if (!isEmpty) {
        setData(reviews)
        notifySuccess('Resenhas listadas com sucesso!')
      }
    } catch (error) {
      notifyError('Erro ao pesquisar resenhas')
    }
  }

  return {
    data,
    fetchReviews,
    createReview,
    searchReview
  }
}
