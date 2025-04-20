import { QuestionRepository } from "@/domain/repositories/QuestionRepository";
import { QuestionDto } from "./dto/QuestionDto";

export class GetQuestionListUsecase{
    constructor(private readonly questionRepo: QuestionRepository) {}

    async execute(categoryId?: number): Promise<QuestionDto[]>{
        if(categoryId){
            return await this.questionRepo.getQuestionsByCategory(categoryId);
        }
        return await this.questionRepo.getAllQuestions();
    }
}