import { useNotifications } from './useNotifications';

import Comment from '../core/domain/models/Comment';

import WebDIContainer from '../dicontainer/web';
import { useCallback } from 'react';

export function useComments() {
  const { notifySuccess, notifyError } = useNotifications();

  const createComment = useCallback(async (comment: Comment) => {
    await create(comment);
  }, []);

  async function create(comment: Comment) {
    try {
      await tryToCreateComment(comment);
    } catch (error) {
      logError('Falha ao criar comentário');
    }
  }

  async function tryToCreateComment(comment: Comment) {
    const commentService = getCommentService();
    await commentService.create(comment);
    logSuccess('Comentário criado com sucesso!');
  }

  function logSuccess(message: string) {
    notifySuccess(message);
  }

  function logError(error: string) {
    notifyError(error);
  }

  function getCommentService() {
    const webDiContainer = new WebDIContainer();
    return webDiContainer.getCommentService();
  }

  return {
    createComment,
  };
}
