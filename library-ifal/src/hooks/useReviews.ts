import { useState } from 'react'

import Review from '../core/domain/models/Review'

import ReviewService from '../services/ReviewService'

import { toast } from 'react-toastify'

import { useAuth } from './useAuth'

const position = toast.POSITION.TOP_RIGHT

export function useReviews() {
  const { isAuthenticated } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])

  async function fetchReviews(): Promise<void> {
    try {
      const reviewService = new ReviewService()
      const data = await reviewService.fetch()
      setReviews(data)
      toast.success('Resenhas listadas com sucesso!', { position })
    } catch (error) {
      toast.error('Erro ao listar resenhas', { position })
    }
  }

  async function addReview(data: Review) {
    if (!isAuthenticated) {
      toast.error('Aviso: é preciso estar logado para criar mensagens.', { position })
      return
    }

    try {
      const reviewService = new ReviewService()
      await reviewService.create(data)
      toast.success('Resenha criada com sucesso!', { position })
    } catch (error) {
      toast.error('Erro ao adicionar resenha', { position })
    }
  }

  async function searchReview(query: string) {
    try {
      const reviewService = new ReviewService()
      const data = await reviewService.search(query)
      const isEmpty = !data.length

      if (!isEmpty) {
        setReviews(data)
        toast.success('Resenhas listadas com sucesso!', { position })
      }
    } catch (error) {
      toast.error('Erro ao pesquisar resenhas', { position })
    }
  }

  return {
    reviews,
    fetchReviews,
    addReview,
    searchReview
  }
}
