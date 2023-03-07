import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import AuthProvider from '../ui/contexts/AuthCTX';
import BookProvider from '../ui/contexts/BookCTX';

import BooksPage from '../ui/pages/BooksPage';
import CommentsPage from '../ui/pages/CommentsPage';
import Error404Page from '../ui/pages/Error404Page';
import HintsPage from '../ui/pages/HintsPage';
import HomePage from '../ui/pages/HomePage';
import LoginPage from '../ui/pages/LoginPage';
import RegisterPage from '../ui/pages/RegisterPage';
import ReviewPage from '../ui/pages/ReviewPage';
import ReviewDetailsPage from '../ui/pages/ReviewDetailsPage';

import styles from './styles.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <BookProvider>
          <AuthProvider>
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/books" element={<BooksPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/reviews" element={<ReviewPage />} />
              <Route
                path="/reviews/review/:id"
                element={<ReviewDetailsPage />}
              />
              <Route path="/contact" element={<CommentsPage />} />
              <Route path="/hints" element={<HintsPage />} />
              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="/*" element={<Error404Page />} />
            </Routes>
          </AuthProvider>
        </BookProvider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
