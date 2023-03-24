import { useCallback, useContext, useEffect } from 'react';

import { useNotifications } from './useNotifications';

import Review from '../core/domain/models/Review';

import { ReviewCTX } from '../ui/contexts/ReviewCTX';

export function useReviews() {
  const { notifyError } = useNotifications();
  const reviewCTX = useContext(ReviewCTX);

  useEffect(() => {
    function loadReviews() {
      fetch();
    }

    loadReviews();
  }, [reviewCTX.reviews]);

  const search = useCallback(
    (query: string) => searchReviews(query),
    [searchReviews]
  );

  async function searchReviews(query: string) {
    await reviewCTX.search(query);
  }

  const fetch = useCallback(() => fetchReviews(), [fetchReviews]);

  async function fetchReviews() {
    await reviewCTX.fetch();
  }

  const create = useCallback(
    (review: Review) => createReview(review),
    [createReview]
  );

  async function createReview(review: Review) {
    try {
      await reviewCTX.create(review);
    } catch (error: any) {
      notifyError(error.message);
    }
  }

  const getReviews = useCallback(
    () => ({ reviews: reviewCTX.reviews }),
    [reviewCTX.reviews]
  );

  return {
    search,
    create,
    getReviews,
  };
}
