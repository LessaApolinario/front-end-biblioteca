import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import AuthProvider from '../ui/contexts/AuthCTX';
import BookProvider from '../ui/contexts/BookCTX';
import PostProvider from '../ui/contexts/PostCTX';
import ReviewProvider from '../ui/contexts/ReviewCTX';

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
import Home from '../ui/frontend/pages/Home';
import Books from '../ui/frontend/pages/Books';
import Reviews from '../ui/frontend/pages/Reviews';

function App() {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <BookProvider>
          <PostProvider>
            <ReviewProvider>
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
                  <Route path="/test" element={<Home />} />
                  <Route path="/books_test" element={<Books />} />
                  <Route path="/reviews_test" element={<Reviews />} />
                </Routes>
              </AuthProvider>
            </ReviewProvider>
          </PostProvider>
        </BookProvider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
