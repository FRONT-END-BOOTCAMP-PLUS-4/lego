export class QuestionDto{
    constructor(
        public id: number,
        public categoryId: number,
        public content: string,
        public solution: string,
        public views: number,
        public createdAt: Date,
    ){}
}