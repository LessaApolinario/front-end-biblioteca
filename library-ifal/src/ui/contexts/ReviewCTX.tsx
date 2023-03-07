import { ReactNode, createContext, useEffect, useState } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';

import Review from '../../core/domain/models/Review';

import isEmpty from '../../core/utils/isEmpty';

import WebDIContainer from '../../dicontainer/web';

interface ReviewCTXProps {
  reviews?: Review[];
  fetch(): Promise<void>;
  search(query: string): Promise<void>;
  create(review: Review): Promise<void>;
}

interface ReviewProviderProps {
  children: ReactNode;
}

export const ReviewCTX = createContext({} as ReviewCTXProps);

function ReviewProvider({ children }: ReviewProviderProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { notifyError, notifySuccess } = useNotifications();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function loadReviews() {
      await fetch();
    }

    loadReviews();
  }, [reviews]);

  async function fetch() {
    try {
      const webDiContainer = new WebDIContainer();
      const reviewService = webDiContainer.getReviewService();
      const reviews = await reviewService.fetch();

      if (!isEmpty(reviews)) {
        setReviews(reviews);
        notifySuccess('Resenhas listadas com sucesso!');
      }
    } catch (error) {
      notifyError('Erro ao listar resenhas');
    }
  }

  async function search(query: string) {
    try {
      const webDiContainer = new WebDIContainer();
      const reviewService = webDiContainer.getReviewService();
      const reviews = await reviewService.search(query);

      if (!isEmpty(reviews)) {
        setReviews(reviews);
        notifySuccess('Resenhas buscadas com sucesso!');
      }
    } catch (error) {
      notifyError('Erro ao pesquisar resenhas');
    }
  }

  async function create(review: Review) {
    if (!isAuthenticated) {
      throw new Error('Aviso: é preciso estar logado para criar resenhas.');
    }

    try {
      const webDiContainer = new WebDIContainer();
      const reviewService = webDiContainer.getReviewService();
      await reviewService.create(review);
      notifySuccess('Resenha criada com sucesso!');
    } catch (error) {
      notifyError('Erro ao adicionar resenha');
    }
  }

  return (
    <ReviewCTX.Provider value={{ reviews, fetch, search, create }}>
      {children}
    </ReviewCTX.Provider>
  );
}

export default ReviewProvider;
