import { QuestionDto } from "@/application/usecase/question/dto/QuestionDto";

export interface QuestionRepository{
    //전체 문제 리스트 출력
    getAllQuestions(): Promise<QuestionDto[]>;
   
    //특정 카테고리 문제리스트 출력
    getQuestionsByCategory(categoryId: number): Promise<QuestionDto[]>;
}

