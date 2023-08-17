import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axiosWithAuth from '../axios/axiosWithAuth'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App(props) {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => { // DONE
    navigate('/')
  }
  const redirectToArticles = () => { // DONE
    navigate('/articles')
  }

  const logout = () => { // DONE
    setMessage('')
    if(localStorage.getItem('token')){
      localStorage.removeItem('token')
      redirectToLogin()
      setMessage('Goodbye!')
    }
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
  }

  const login = ({ username, password }) => { // DONE
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth().post(loginUrl, {username, password})
      .then(res => {
        localStorage.setItem('token', res.data.token)
        redirectToArticles()
        setMessage(res.data.message)
        setSpinnerOn(false)
      })
      .catch(err => {
        setSpinnerOn(false)
        setMessage(err.response)
      })
  }

  const getArticles = () => { // DONE
    setSpinnerOn(true)
    axiosWithAuth().get(articlesUrl)
    .then(res => {
      setSpinnerOn(false)
      setMessage(res.data.message)
      setArticles(res.data.articles)
    })
    .catch(err => {
      setSpinnerOn(false)
      setMessage(err.response)
      if(err.response.status === 401) {
        redirectToLogin()
      }
    })
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
  }

  const postArticle = article => { // DONE
    setMessage('')
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    setSpinnerOn(true)
      axiosWithAuth().post(articlesUrl, article)
      .then(res => {
        console.log(res.data)
        setSpinnerOn(false)
        setMessage(res.data.message)
        setArticles(prevArticles => [...prevArticles, res.data.article])
      })
      .catch(err => {
        setSpinnerOn(false)
        setMessage(err.response)
        if(err.response.status === 401) {
          redirectToLogin()
        }
      })
  }

  const updateArticle = ({ article_id, article }) => {
    setMessage('')
    setCurrentArticleId(article_id)
    setSpinnerOn(true)
    // ✨ implement
    // You got this!
    // axios call here
    setSpinnerOn(false)
    setMessage(res.data.message)
  }

  const deleteArticle = article_id => { // DONE
    setMessage('')
    // ✨ implement
    setSpinnerOn(true)
    axiosWithAuth().delete(`${articlesUrl}/${article_id}`)
      .then(res => {
        setSpinnerOn(false)
        setMessage(res.data.message)
        // getArticles()
        axiosWithAuth().get(articlesUrl)
        .then(res => {
          setArticles(res.data.articles)
        })
        .catch(err => {
          setSpinnerOn(false)
          setMessage(err.response)
          })
        })
      .catch(err => {
        setSpinnerOn(false)
        setMessage(err.response)
      })
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗DONE
    <>
      <Spinner on={spinnerOn}/>
      <Message message={message}/>
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route exact path="/" element={<LoginForm login={login}/>} />
          <Route exact path="articles" element={
            <>
              <ArticleForm currentArticle={currentArticleId} setCurrentArticleId={setCurrentArticleId} postArticle={postArticle} updateArticle={updateArticle}/>
              <Articles currentArticleId={currentArticleId} setCurrentArticleId={setCurrentArticleId} articles={articles} deleteArticle={deleteArticle} updateArticle={updateArticle} getArticles={getArticles}/>
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </>
  )
}
