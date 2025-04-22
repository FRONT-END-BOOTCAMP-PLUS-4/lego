import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { formatDate } from "@/utils/handleFormatDate";
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
      <div className="grid grid-cols-2 grid-rows-auto gap-x-4 gap-y-4">
        {QuestionAnswers?.map((answer) => {
          return (
            <Card key={answer.email}>
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center mb-6 justify-between w-full">
                  <p className="line-clamp-2 txt-base">{answer.content}</p>
                  <span
                    className="w-[32px] h-[32px] ml-4 inline-block bg-[var(--gray-01)] rounded-full shrink-0 bg-center bg-contain bg-no-repeat"
                    style={{ backgroundImage: `url(${answer.avatarUrl})` }}
                  ></span>
                </div>
                <div className="flex justify-between">
                  <span>
                    <span className="txt-sm !text-[var(--gray-02)] mr-2">
                      {formatDate(answer.createdAt)}
                    </span>
                    <span className="txt-sm !text-[var(--gray-02)]">{answer.username}</span>
                  </span>
                  <span className="txt-sm !text-[var(--gray-02)]">좋아요 {answer.likeCount}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      {/* <Pagination
        pageNumber={pageNumber} //현재 페이지 번호
        totalCount={totalCount} //전체 데이터 개수
        currentPageBlock={currentPageBlock} //현재 블록 순서
        itemsPerPage={itemsPerPage} //한 페이지당 보여줄 데이터 수
        handleMovePageBlock={(block) => setCurrentPageBlock(block)} // 블록 이동 핸들러
        handleMovePage={(page) => setPage(page)} // 페이지 이동 핸들러
      /> */}
    </>
  );
}
