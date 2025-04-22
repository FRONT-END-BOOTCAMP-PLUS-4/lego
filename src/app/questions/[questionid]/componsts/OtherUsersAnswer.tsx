import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface Prop {
  questionId: number;
  token: string;
}

export default function OtherUsersAnswer({ questionId, token }: Prop) {
  const [QuestionAnswers, setQuestionAnswers] = useState();
  const handleGetOtherAnswers = async () => {
    const response = await fetch(`/api/questions/${questionId}/answers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("서버 응답 실패");
    }
    const { date } = await response.json();
    console.log(date);
    setQuestionAnswers(date);
  };

  useEffect(() => {
    handleGetOtherAnswers();
  }, []);

  return (
    <>
      <h3 className="txt-2xl-b pb-6">다른 사람 답변 확인하기</h3>
      <div className="grid grid-cols-2 grid-rows-auto gap-x-4 gap-y4">
        {QuestionAnswers?.map((answer) => {
          return (
            <Card key={answer.email}>
              <div className="flex gap-4 items-center mb-6">
                <p className="line-clamp-2">{answer.content}</p>
                <span
                  className="w-[32px] h-[32px] inline-block bg-[var(--gray-01)] rounded-full shrink-0 bg-center bg-contain bg-no-repeat"
                  style={{ backgroundImage: `url(${answer.avatarUrl})` }}
                ></span>
              </div>
              <div className="flex justify-between">
                <span>
                  <span className="txt-sm !text-[var(--gray-02)] mr-2">{answer.createdAt}</span>
                  <span className="txt-sm !text-[var(--gray-02)] mr-2">{answer.createdAt}</span>
                  <span className="txt-sm !text-[var(--gray-02)]">{answer.username}</span>
                </span>
                <span className="txt-sm !text-[var(--gray-02)]">좋아요 {answer.likeCount}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
