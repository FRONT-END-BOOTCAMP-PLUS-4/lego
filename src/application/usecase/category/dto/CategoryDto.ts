//카테고리 하나의 DTO
export class CategoryDto {
  constructor(
    public id: number,
    public name: string,
    public image_url: string
  ) {}
}