import Comment from "../../domain/models/Comment";

abstract class ICommentService {
  abstract create(comment: Comment): Promise<void>
}
export default ICommentService
