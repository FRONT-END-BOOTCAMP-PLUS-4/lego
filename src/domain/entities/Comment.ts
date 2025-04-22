export class Comment {
    constructor(
        public id: number,
        public question_id: number,
        public answer_email: string,
        public context: string,
        public createdAt: Date,
        public email: string,
        public user_name: string,
        public avatar_url: string
    ){}
}