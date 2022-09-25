abstract class ICommentService {
  abstract create(_id: string, name: string, email: string, comment: string): Promise<void>
}
export default ICommentService
