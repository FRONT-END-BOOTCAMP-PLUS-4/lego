import { useEffect, useState } from "react";
import AnswerHeader from "./AnswerHeader";
import { useAuthStore } from "@/store/useAuthStore";
import { useParams } from "next/navigation";
import { AnswerView } from "@/domain/entities/AnswerView";
import { formatDate } from "@/utils/handleFormatDate";

export default function AnswerContent() {
  const { user, token } = useAuthStore();
  const currentUserId = user?.email; //현재 로그인한 유저 아이디
  const params = useParams();
  const questionId = params.questionid;
  const answerId = params.answerid;
  const [answerData, setAnswerDate] = useState<AnswerView | null>(null);
  const handleGetAnswerDetail = async () => {
    //답변을 작성한 유저의 아이디 필요
    const response = await fetch(`/api/questions/${questionId}/answers/${answerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("서버 응답 실패");
    }
    const { data } = await response.json();
    setAnswerDate(data);
  };
  console.log(answerData);
  useEffect(() => {
    handleGetAnswerDetail();
  }, []);

  return (
    <>
      <AnswerHeader title={answerData?.question} category={answerData?.category} />

      <div className="flex items-center gap-4 mt-6">
        <span
          className="w-[36px] h-[36px] inline-block bg-[var(--gray-01)] rounded-full shrink-0 bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(${answerData?.avatarUrl})` }}
        ></span>
        <div>
          <div className="text-sm mb-1 font-bold text-[var(--gray-02)]">{answerData?.username}</div>
          <div className="text-xs text-[var(--gray-02)]">{formatDate(answerData?.createdAt)}</div>
        </div>
      </div>

      <div className="mt-[30px] text-base leading-[2]">{answerData?.content}</div>
    </>
  );
}
