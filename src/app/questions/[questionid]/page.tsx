"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import AnswerPreviewCard from "./componsts/AnswerPreviewCard";
import QusetionHeader from "./componsts/QusetionHeader";
import QuestionSolution from "@/app/questions/[questionid]/componsts/QuestionSolution";
import { useParams } from "next/navigation";

type AnswerAction = "create" | "update";
interface QuestionResponse {
  id: number;
  categoryId: number;
  categoryName: string;
  content: string;
  answer: string;
  isBookmarked: boolean;
  solution: string;
  views: number;
  createdAt: string;
}
interface Props {
  params: {
    questionid: string;
  };
  searchParams: {
    userId?: string;
  };
}
export default function AnswerFormPage({ searchParams }: Props) {
  const params = useParams();
  const questionId = Number(params.questionid);
  const userEmail = searchParams.userId;
  const [tab, setTab] = useState<string>("tab1");
  const [userAnswer, setUserAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [questionData, setQuestionData] = useState<QuestionResponse | null>(null);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const avatar = user?.avatarUrl;
  const nickName = user?.nickname;

  // 초기 들어왔을 때 이전에 작성한 답변이 있으면 불러오기
  //userId 없을 수 있음, questionId 필수

  const handleGetQuestion = async () => {
    try {
      const response = await fetch(`/api/questions/${questionId}?userId=${userEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("서버 응답 실패");
      }
      const data = await response.json();
      setQuestionData(data?.data);
    } catch (error) {
      alert("문제, 답변 불러오기 실패: " + (error as Error).message);
    }
  };
  useEffect(() => {
    handleGetQuestion();
  }, []);

  useEffect(() => {
    if (!questionData) return;
    if (questionData?.answer !== "") {
      setUserAnswer(questionData.answer);
      setIsSubmitted(true);
      setIsEditing(false);
    }
  }, [questionData]);

  //답변 저장, 수정
  const handleSaveAnswer = async (action: AnswerAction) => {
    const method = action === "create" ? "POST" : "PUT";
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    const formData = {
      userId: userEmail,
      questionId,
      content: userAnswer,
      userName: nickName,
      avatarUrl: avatar,
    };
    try {
      const response = await fetch(`/api/answers`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(action === "create" ? "답변 저장 실패." : "답변 변경 실패.");
      }
      alert(action === "create" ? "답변이 저장되었습니다." : "답변이 변경되었습니다.");
      setIsSubmitted(true);
      setIsEditing(false);
    } catch (error) {
      alert(`${action === "create" ? "답변 저장" : "답변 변경"} 실패: ${(error as Error).message}`);
    }
  };

  //답변 삭제
  const handleDeleteAnswer = async () => {
    try {
      const response = await fetch(`/api/answers`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userEmail,
          questionId,
        }),
      });
      if (!response.ok) {
        throw new Error("답변 삭제 실패");
      }
      alert("답변이 삭제되었습니다.");
      setUserAnswer("");
      setIsSubmitted(false);
      setIsEditing(true);
    } catch (error) {
      alert("답변 저장 실패: " + (error as Error).message);
    }
  };
  if (!questionData) return <div>로딩 중...</div>;
  const { content, solution, isBookmarked, categoryName } = questionData;
  return (
    <div className="container mx-auto pt-[40px]">
      <QusetionHeader
        content={content}
        categoryName={categoryName}
        isBookmarked={isBookmarked}
        questionId={questionId}
      />
      <form>
        <Tabs defaultValue="tab1" value={tab} onValueChange={setTab}>
          <TabsList className="mr-0 ml-auto">
            <TabsTrigger value="tab1">나의 답변 작성하기</TabsTrigger>
            <TabsTrigger value="tab2">모범 답안 확인하기</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <textarea
              className="box-border p-[24px] h-[500px] border border-[var(--blue-03)] radius mt-6 w-full resize-none focus:ring-1 focus:ring-[var(--blue-03)] focus:outline-none"
              placeholder="내용을 입력하세요..."
              onChange={(e) => setUserAnswer(e.target.value)}
              value={userAnswer}
              disabled={!isEditing}
            ></textarea>
          </TabsContent>
          <TabsContent value="tab2">
            <QuestionSolution solution={solution} />
          </TabsContent>
        </Tabs>
        {tab === "tab1" && (
          <div className="flex justify-center mt-[24px]">
            {/* 이미 기존에 작성한 답변이 있으면 수정 삭제 먼저 */}
            {isSubmitted && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  type="button"
                  onClick={() => {
                    if (isEditing) {
                      handleSaveAnswer("update");
                    }
                    setIsEditing((prev) => !prev);
                  }}
                >
                  {isEditing ? "저장" : "수정"}
                </Button>
                <Button variant="gray" size="lg" type="button" onClick={handleDeleteAnswer}>
                  삭제
                </Button>
              </div>
            )}
            {!isSubmitted && (
              <Button size="lg" type="button" onClick={() => handleSaveAnswer("create")}>
                저장
              </Button>
            )}
          </div>
        )}
      </form>
      <div className="pt-[150px] pb-[150px]">
        <h3 className="txt-2xl-b pb-6">다른 사람 답변 확인하기</h3>
        <div className="grid grid-cols-2 grid-rows-auto gap-x-16 gap-y-24">
          <AnswerPreviewCard />
        </div>
      </div>
    </div>
  );
}
