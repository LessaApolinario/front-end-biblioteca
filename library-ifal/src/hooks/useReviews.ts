import { useState } from 'react'

import Review from '../core/domain/models/Review'

import ReviewService from '../services/ReviewService'

import { useAuth } from './useAuth'
import { useNotifications } from './useNotifications'

export function useReviews() {
  const { isAuthenticated } = useAuth()
  const { notifySuccess, notifyError } = useNotifications()
  const [reviews, setReviews] = useState<Review[]>([])

  async function fetchReviews(): Promise<void> {
    try {
      const reviewService = new ReviewService()
      const data = await reviewService.fetch()
      const isEmpty = !data?.length

      if (!isEmpty) {
        setReviews(data)
        notifySuccess('Resenhas listadas com sucesso!')
      }
    } catch (error) {
      notifyError('Erro ao listar resenhas')
    }
  }

  async function createReview(data: Review) {
    if (!isAuthenticated) {
      throw new Error('Aviso: é preciso estar logado para criar mensagens.')
    }

    try {
      const reviewService = new ReviewService()
      await reviewService.create(data)
      notifySuccess('Resenha criada com sucesso!')
    } catch (error) {
      notifyError('Erro ao adicionar resenha')
    }
  }

  async function searchReview(query: string) {
    try {
      const reviewService = new ReviewService()
      const data = await reviewService.search(query)
      const isEmpty = !data.length

      if (!isEmpty) {
        setReviews(data)
        notifySuccess('Resenhas listadas com sucesso!')
      }
    } catch (error) {
      notifyError('Erro ao pesquisar resenhas')
    }
  }

  return {
    reviews,
    fetchReviews,
    createReview,
    searchReview
  }
}
