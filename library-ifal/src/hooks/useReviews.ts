import { useEffect, useState } from 'react';

import Review from '../core/domain/models/Review';

import { useAuth } from './useAuth';
import { useNotifications } from './useNotifications';

import WebDIContainer from '../dicontainer/web';

export function useReviews() {
  const { isAuthenticated } = useAuth();
  const { notifySuccess, notifyError } = useNotifications();
  const [data, setData] = useState<Review[]>();
  const diContainer = new WebDIContainer();
  const service = diContainer.getReviewService();

  useEffect(() => {
    async function loadReviews() {
      await fetchReviews();
    }

    loadReviews();
  }, [data]);

  async function fetchReviews(): Promise<void> {
    try {
      const reviews = await service.fetch();
      const isEmpty = !reviews?.length;

      if (!isEmpty) {
        setData(reviews);
        notifySuccess('Resenhas listadas com sucesso!');
      }
    } catch (error) {
      notifyError('Erro ao listar resenhas');
    }
  }

  async function createReview(review: Review) {
    if (!isAuthenticated) {
      throw new Error('Aviso: é preciso estar logado para criar resenhas.');
    }

    try {
      await service.create(review);
      notifySuccess('Resenha criada com sucesso!');
    } catch (error) {
      notifyError('Erro ao adicionar resenha');
    }
  }

  async function searchReview(query: string) {
    try {
      const reviews = await service.search(query);
      const isEmpty = !reviews.length;

      if (!isEmpty) {
        setData(reviews);
        notifySuccess('Resenhas listadas com sucesso!');
      }
    } catch (error) {
      notifyError('Erro ao pesquisar resenhas');
    }
  }

  return {
    data,
    fetchReviews,
    createReview,
    searchReview,
  };
}
