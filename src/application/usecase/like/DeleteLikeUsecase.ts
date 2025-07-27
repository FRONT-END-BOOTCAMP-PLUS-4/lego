import { LikeRepository } from "@/domain/repositories/LikeRepository";
import { DeleteLikeDto } from "./dto/DeleteLikeDto";

export class DeleteLikeUsecase {
  constructor(private likeRepo: LikeRepository) {}
  async execute(deleteDto: DeleteLikeDto): Promise<void> {
    return await this.likeRepo.deleteLike(deleteDto);
  }
}
