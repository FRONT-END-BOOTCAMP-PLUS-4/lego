import { UserActivity } from "@/domain/entities/UserActivity";
import { UserAnswer } from "@/domain/entities/UserAnswer";
import { UserBookmark } from "@/domain/entities/UserBookmark";
import { UserLikedAnswer } from "@/domain/entities/UserLike";
import { UserComment } from "@/domain/entities/UserComment";

export interface UserRepository {
  getUserActivity(email: string): Promise<UserActivity>;
  getUserAnswers(email: string): Promise<UserAnswer[]>;
  getUserBookmarks(email: string): Promise<UserBookmark[]>;
  getUserLikedAnswers(email: string): Promise<UserLikedAnswer[]>;
  getUserComments(email: string): Promise<UserComment[]>;
}
