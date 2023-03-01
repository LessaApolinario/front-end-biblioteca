import { createRef } from 'react';

import { useNotifications } from './useNotifications';

import CommentBuilder from '../core/domain/builders/CommentBuilder';

import WebDIContainer from '../dicontainer/web';

export function useComments() {
  const { notifySuccess, notifyError } = useNotifications();
  const nameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const commentRef = createRef<HTMLTextAreaElement>();

  async function handleCreateComment() {
    await create();
    clearFields();
  }

  async function create() {
    try {
      const diContainer = new WebDIContainer();
      const commentService = diContainer.getCommentService();
      await commentService.create(buildComment());
      notifySuccess('Comentário criado com sucesso!');
    } catch (error: any) {
      notifyError('Falha ao criar comentário');
    }
  }

  function buildComment() {
    return new CommentBuilder(nameRef.current?.value)
      .withEmail(emailRef.current?.value)
      .withComment(commentRef.current?.value)
      .build();
  }

  function clearFields() {
    const nameInput = nameRef.current;
    const emailInput = emailRef.current;
    const commentTextArea = commentRef.current;

    if (nameInput && emailInput && commentTextArea) {
      nameInput.value = '';
      emailInput.value = '';
      commentTextArea.value = '';
    }
  }

  return {
    handleCreateComment,
    refs: {
      nameRef,
      emailRef,
      commentRef,
    },
  };
}
