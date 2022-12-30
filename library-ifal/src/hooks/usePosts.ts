import { useEffect, useState } from 'react'

import Post from '../core/domain/models/Post'

import PostService from '../services/PostService'

import { useNotifications } from './useNotifications'
import { useAuth } from './useAuth'

export function usePosts() {
  const [data, setData] = useState<Post[]>()
  const { notifySuccess, notifyError } = useNotifications()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    async function loadPosts() {
      await fetchPosts()
    }

    loadPosts()
  }, [data])

  async function fetchPosts(): Promise<Post[] | undefined> {
    try {
      const postService = new PostService()
      const posts = await postService.fetch()
      setData(posts)
      notifySuccess('Posts listados com sucesso!')
      return posts
    } catch (error) {
      notifyError('Erro ao listar posts')
    }
  }

  async function createPost(post: Post) {
    if(!isAuthenticated) {
      throw new Error('Aviso: é preciso estar logado para criar posts.')
    }

    try {
      const postService = new PostService()
      await postService.create(post)
      notifySuccess('Post criado com sucesso!')
    } catch (error) {
      notifyError('Erro ao criar post')
    }
  }

  return {
    data,
    createPost,
    fetchPosts
  }
}
