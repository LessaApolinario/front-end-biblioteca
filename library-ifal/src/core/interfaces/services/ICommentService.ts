abstract class ICommentService {
  abstract create(name: string, email: string, comment: string): Promise<void>
}
export default ICommentService
