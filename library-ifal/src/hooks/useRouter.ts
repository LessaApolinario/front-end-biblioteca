import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useRouter<T>() {
  const navigate = useNavigate();

  const goto = useCallback((route: string) => navigate(route), [navigate]);

  const redirectToDetailsPage = useCallback(
    <T>(route: string, state: T) => navigate(route, { state }),
    [navigate]
  );

  const redirectToPreviousPage = useCallback(() => navigate(-1), [navigate]);

  return { goto, redirectToDetailsPage, redirectToPreviousPage };
}
