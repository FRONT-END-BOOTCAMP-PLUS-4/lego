import { Category } from '@/domain/entities/Category';

export interface CategoryRepository {
  findAll(): Promise<Category[]>;// 모든 카테고리 조회
}
