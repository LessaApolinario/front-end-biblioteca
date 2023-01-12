import IBookService from '../core/interfaces/services/IBookService';
import ICommentService from '../core/interfaces/services/ICommentService';
import IPostService from '../core/interfaces/services/IPostService';
import IReviewService from '../core/interfaces/services/IReviewService';
import IUserService from '../core/interfaces/services/IUserService';

abstract class DIContainer {
  abstract getBookService(): IBookService;
  abstract getCommentService(): ICommentService;
  abstract getPostService(): IPostService;
  abstract getReviewService(): IReviewService;
  abstract getUserService(): IUserService;
}

export default DIContainer;
