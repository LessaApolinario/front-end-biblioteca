import { useCallback } from 'react';

import { useNotifications } from './useNotifications';

import Comment from '../core/domain/models/Comment';

import logWithCallback from '../core/utils/logWithCallback';

import WebDIContainer from '../dicontainer/web';

export function useComments() {
  const { notifySuccess, notifyError } = useNotifications();

  const createComment = useCallback(async (comment: Comment) => {
    await create(comment);
  }, []);

  async function create(comment: Comment) {
    try {
      await tryToCreateComment(comment);
    } catch (error) {
      logWithCallback('Falha ao criar comentário', notifyError);
    }
  }

  async function tryToCreateComment(comment: Comment) {
    const commentService = getCommentService();
    await commentService.create(comment);
    logWithCallback('Comentário criado com sucesso!', notifySuccess);
  }

  function getCommentService() {
    const webDiContainer = new WebDIContainer();
    return webDiContainer.getCommentService();
  }

  return {
    createComment,
  };
}
