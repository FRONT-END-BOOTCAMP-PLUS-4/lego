import { Like } from "@/domain/entities/Like";
import { CreateLikeDto } from "./dto/CreateLikeDto";
import { LikeRepository } from "@/domain/repositories/LikeRepository";

export class CreateLikeUsecase {
  constructor(private likeRepo: LikeRepository) {}
  async execute(createDto: CreateLikeDto): Promise<Like> {
    return await this.likeRepo.createLike(createDto);
  }
}
