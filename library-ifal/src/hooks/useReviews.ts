import { createRef, useEffect, useState } from 'react';

import Review from '../core/domain/models/Review';

import ReviewBuilder from '../core/domain/builders/ReviewBuilder';

import { useAuth } from './useAuth';
import { useNotifications } from './useNotifications';

import WebDIContainer from '../dicontainer/web';

export function useReviews() {
  const { isAuthenticated, user } = useAuth();
  const { notifySuccess, notifyError } = useNotifications();
  const [data, setData] = useState<Review[]>();
  const bookTitleRef = createRef<HTMLInputElement>();
  const authorNameRef = createRef<HTMLInputElement>();
  const reviewTextareaRef = createRef<HTMLTextAreaElement>();
  const searchRef = createRef<HTMLInputElement>();

  useEffect(() => {
    async function loadReviews() {
      await fetchReviews();
    }

    loadReviews();
  }, [data]);

  async function fetchReviews(): Promise<void> {
    try {
      const webDiContainer = new WebDIContainer();
      const reviewService = webDiContainer.getReviewService();
      const reviews = await reviewService.fetch();
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
      const webDiContainer = new WebDIContainer();
      const reviewService = webDiContainer.getReviewService();
      await reviewService.create(review);
      notifySuccess('Resenha criada com sucesso!');
    } catch (error) {
      notifyError('Erro ao adicionar resenha');
    }
  }

  function buildReview() {
    return new ReviewBuilder(user?.name)
      .withUserID(user?.id)
      .withTitleBook(bookTitleRef.current?.value)
      .withWriter(authorNameRef.current?.value)
      .withReview(reviewTextareaRef.current?.value)
      .withAvailable(true)
      .build();
  }

  async function addReview() {
    try {
      await createReview(buildReview());
    } catch (error: any) {
      notifyError(error.message);
    }
  }

  async function searchReview() {
    const query = searchRef.current?.value ?? '';
    await search(query);
  }

  async function search(query: string) {
    try {
      const webDiContainer = new WebDIContainer();
      const reviewService = webDiContainer.getReviewService();
      const reviews = await reviewService.search(query);
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
    addReview,
    searchReview,
    fetchReviews,
    data,
    refs: { bookTitleRef, authorNameRef, reviewTextareaRef, searchRef },
  };
}
