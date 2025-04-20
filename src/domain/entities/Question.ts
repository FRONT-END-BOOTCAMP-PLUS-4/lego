export class Question {
    constructor(
        public id: number,
        public category_id: number,
        public context: string,
        public solution: string,
        public view: number,
        public createdAt?: Date,
    ){};
}