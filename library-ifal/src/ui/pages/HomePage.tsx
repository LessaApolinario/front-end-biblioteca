import { ReactNode, createRef, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { GiTreeBranch } from 'react-icons/gi'

import Button from '../components/Button'
import Header from '../components/Header'
import PostComponent from '../components/PostComponent'
import FlexWrapper from '../components/FlexWrapper'
import Label from '../components/Label'
import Input from '../components/Input'
import PostsList from '../components/PostsList'

import { AuthCTX } from '../contexts/AuthCTX'

import PostService from '../../services/PostService'

import Post from '../../core/domain/models/Post'

import styles from '../styles/pages/HomePage.module.scss'

import harry from '../../assets/img/harry.jpg'
import Microcontrolador8051ComLinguagemC from '../../assets/img/Microcontrolador8051ComLinguagemC.jpg'
import padroesdeprojeto from '../../assets/img/padroesdeprojeto.jpg'
import AHoraDaEstrela from '../../assets/img/AHoraDaEstrela.jpg'
import funcoes from '../../assets/img/funcoes.jpg'
import _1984 from '../../assets/img/_1984.jpg'
import OAlienista from '../../assets/img/OAlienista.jpeg'
import PHP from '../../assets/img/PHP.jpg'
import Python from '../../assets/img/Python.jpg'

function HomePage() {
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const createPostRef = createRef<HTMLButtonElement>()
  const [isVisible, setIsVisible] = useState(false)
  const [warning, setWarning] = useState(true)
  const [text, setText] = useState<string>('Escreva um post')
  const [posts, setPosts] = useState<Post[]>([])
  const authCTX = useContext(AuthCTX)

  useEffect(() => {
    const getPosts = async () => {
      const postService = new PostService()
      const data = await postService.fetch()
      const posts = data.reverse()
      setPosts(posts)
    }

    getPosts()
  }, [])

  useEffect(() => {
    const storagedUser = localStorage.getItem('user')
    const storagedToken = localStorage.getItem('token')

    if (!storagedUser && !storagedToken) {
      createPostRef.current?.setAttribute('disabled', 'true')
    } else {
      createPostRef.current?.removeAttribute('disabled')
    }
  }, [createPostRef])

  useEffect(() => {
    const storagedUser = localStorage.getItem('user')
    const storagedToken = localStorage.getItem('token')

    if (!storagedUser && !storagedToken) {
      setWarning(true)
    } else {
      setWarning(false)
    }
  }, [])

  const handleCreatePost = async (event: React.FormEvent) => {
    event.preventDefault()
    const title = titleRef.current?.value
    const content = contentRef.current?.value
    const isLoggedUser = localStorage.getItem('token')
    const user = authCTX.user

    if (!user) {
      return
    }

    const { name, id } = user

    if (!title || !content || isLoggedUser == null || !name || !id) {
      return
    }

    const newPost = new Post()
    newPost.title = title
    newPost.content = content
    newPost.user_name = name
    newPost.user_id = id

    const postService = new PostService()
    await postService.create(newPost)


    setPosts((previousState) => [
      newPost,
      ...previousState
    ])

    setIsVisible(!isVisible)
    setText('Escreva um post')
  }

  const renderForm = () => {
    if (isVisible) {
      return (
        <form action='#' ref={formRef}
          onSubmit={handleCreatePost} className={styles.form}>
          <FlexWrapper className={styles.postTitle} orientation={'column'}>
            <Label text={'Título do post'} />
            <Input type={'text'} name={'título do post'} />
          </FlexWrapper>

          <FlexWrapper className={styles.postContent} orientation={'column'}>
            <Label text={'Conteúdo do post'} />
            <textarea cols={30} rows={10} ref={contentRef}></textarea>
          </FlexWrapper>

          <Button
            type='submit'
            btnType='secondary'
            ref={createPostRef}
          >
            Publicar post
          </Button>
          {
            warning
            &&
            <p className={styles.warning}>Faça login para criar um post</p>
          }
        </form>
      )
    }
  }

  const changeButtonText = () => {
    if (!isVisible && text === 'Escreva um post') {
      setText('Fechar')
    } else if (isVisible && text === 'Fechar') {
      setText('Escreva um post')
    }

    setIsVisible(!isVisible)
  }

  const renderButtons = () => {
    const storagedUser = localStorage.getItem('user')
    const storagedToken = localStorage.getItem('token')

    if (!storagedUser && !storagedToken) {
      return (
        <>
          <Button
            type='button'
            btnType='secondary'
            onClick={() => navigate('/login')}
          >
            Entrar
          </Button>
          <Button
            type='button'
            btnType='secondary'
            onClick={() => navigate('/register')}
          >
            Cadastrar-se
          </Button>
        </>
      )
    } else {
      return (
        <Button
          type='button'
          btnType='secondary'
          onClick={() => {
            authCTX.logout()
            setWarning(true)
          }}
        >
          Sair
        </Button>
      )
    }
  }

  function renderItem(item: Post): ReactNode {
    return <PostComponent data={item} />
  }

  return (
    <main className={styles.container}>
      <Header>
        <GiTreeBranch />
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/books')}>Livros</li>
          <li onClick={() => navigate('/reviews')}>Resenhas</li>
          <li onClick={() => navigate('/hints')}>Dicas</li>
          <li onClick={() => navigate('/contact')}>Contato</li>
        </ul>

        <div className={styles.buttons}>
          {renderButtons()}
        </div>
      </Header>

      <section className={styles.content}>
        <h1>Bem-vindo</h1>

        <div className={styles.carrousel}>
          <div className={styles.images}>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={harry} alt='' />
              <p>Harry Potter e o cálice de fogo</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={Microcontrolador8051ComLinguagemC} alt='' />
              <p>Microcontrolador 8051 com Linguagem C</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={padroesdeprojeto} alt='' />
              <p>Use a cabeça!: padrões de projetos</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={AHoraDaEstrela} alt='' />
              <p>A hora da estrela</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={funcoes} alt='' />
              <p>Fundamentos de matemática elementar: Conjuntos e funções</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={_1984} alt='' />
              <p>1984</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={OAlienista} alt='' />
              <p>O alienista</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={PHP} alt='' />
              <p>Desenvolvendo Websites com PHP</p>
            </div>
            <div className={styles.item}>
              <img onClick={() => navigate('/books')} src={Python} alt='' />
              <p>Introdução à prgramação com Python</p>
            </div>
          </div>
        </div>

        <h3>Área de posts</h3>

        <div className={styles.posts}>
          <div className={styles.search}>
            <Button
              type='button'
              btnType='secondary'
              onClick={changeButtonText}
            >
              {text}
            </Button>
          </div>

          {renderForm()}

          <PostsList
            data={posts}
            renderItem={renderItem} />
        </div>
      </section>
    </main>
  )
}

export default HomePage
