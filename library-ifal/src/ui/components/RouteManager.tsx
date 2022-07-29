import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import BooksPage from "../pages/BooksPage"

import Error404Page from "../pages/Error404Page"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import ReviewPage from "../pages/ReviewPage"

function RouteManager() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/" element={<Navigate replace to='/home' />} />
        <Route path="/*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteManager
