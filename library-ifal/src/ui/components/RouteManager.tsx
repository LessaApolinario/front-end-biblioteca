import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Error404Page from "../pages/Error404Page"
import HomePage from "../pages/HomePage"

function RouteManager() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/books" element={<HomePage />} />
        <Route path="/" element={<Navigate replace to='/books' />} />
        <Route path="/*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteManager
