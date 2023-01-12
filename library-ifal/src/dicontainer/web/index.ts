import IBookService from '../../core/interfaces/services/IBookService';
import ICommentService from '../../core/interfaces/services/ICommentService';
import IPostService from '../../core/interfaces/services/IPostService';
import IReviewService from '../../core/interfaces/services/IReviewService';
import IUserService from '../../core/interfaces/services/IUserService';
import BookService from '../../core/services/BookService';
import CommentService from '../../core/services/CommentService';
import PostService from '../../core/services/PostService';
import ReviewService from '../../core/services/ReviewService';
import UserService from '../../core/services/UserService';
import BookAPI from '../../infra/api/book';
import CommentAPI from '../../infra/api/comment';
import PostAPI from '../../infra/api/post';
import ReviewAPI from '../../infra/api/review';
import UserAPI from '../../infra/api/user';
import DIContainer from '../DIContainer';

class WebDIContainer extends DIContainer {
  getBookService(): IBookService {
    return new BookService(new BookAPI());
  }

  getCommentService(): ICommentService {
    return new CommentService(new CommentAPI());
  }

  getPostService(): IPostService {
    return new PostService(new PostAPI());
  }

  getReviewService(): IReviewService {
    return new ReviewService(new ReviewAPI());
  }

  getUserService(): IUserService {
    return new UserService(new UserAPI());
  }
}

export default WebDIContainer;
