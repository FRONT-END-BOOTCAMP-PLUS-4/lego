import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserCommentDto } from "@/application/user/dto/UserCommentDto";

export class GetUserCommentsUsecase {
  constructor(private readonly repository: UserRepository) {}

  async execute(email: string): Promise<UserCommentDto[]> {
    return this.repository.getUserComments(email);
  }
}
