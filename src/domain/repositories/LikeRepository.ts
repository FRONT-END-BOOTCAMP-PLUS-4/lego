import { CreateLikeDto } from "@/application/usecase/like/dto/CreateLikeDto";
import { Like } from "../entities/Like";
import { DeleteLikeDto } from "@/application/usecase/like/dto/DeleteLikeDto";

export interface LikeRepository {
  //답변 좋아요
  createLike(like: CreateLikeDto): Promise<Like>;

  //답변 좋아요 삭제
  deleteLike(like: DeleteLikeDto): Promise<void>;
}
