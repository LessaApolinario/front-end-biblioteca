import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AuthProvider from "../contexts/AuthCTX"
import BooksPage from "../pages/BooksPage"

import Error404Page from "../pages/Error404Page"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import ReviewDetailsPage from "../pages/ReviewDetailsPage"
import ReviewPage from "../pages/ReviewPage"

function RouteManager() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/reviews/review/:username" element={<ReviewDetailsPage />} />
          <Route path="/" element={<Navigate replace to='/home' />} />
          <Route path="/*" element={<Error404Page />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default RouteManager
