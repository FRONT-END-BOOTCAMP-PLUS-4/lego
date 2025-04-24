"use client";
import Empty from "@/app/components/Empty";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { AnswerView } from "@/domain/entities/AnswerView";
import { formatDate } from "@/utils/handleFormatDate";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface PropsType {
  questionId: number;
  userEmail: string | null;
  token: string | null;
}
const itemsPerPage = 4;

export default function OtherUsersAnswer({ questionId, userEmail, token }: PropsType) {
  const [questionAnswers, setQuestionAnswers] = useState<AnswerView[]>([]);
  const [currentPageBlock, setCurrentPageBlock] = useState(1);
  const [pageNumber, setPage] = useState(1);
  const totalCount = questionAnswers.length;
  const paginatedAnswers = questionAnswers.slice(
    (pageNumber - 1) * itemsPerPage,
    pageNumber * itemsPerPage
  );
  const handleGetOtherAnswers = async () => {
    const response = await fetch(`/api/questions/${questionId}/answers?userId=${userEmail}`, {
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
    setQuestionAnswers(data);
  };

  useEffect(() => {
    handleGetOtherAnswers();
  }, []);
  console.log(paginatedAnswers);
  const isContents = paginatedAnswers?.length > 0;
  return (
    <>
      <h3 className="txt-2xl-b pb-6">다른 사람 답변 확인하기</h3>
      <div
        className={`grid grid-rows-auto gap-x-4 gap-y-4 ${
          isContents ? "grid-cols-2" : "grid-cols-1 mb-[100px]"
        }`}
      >
        {questionAnswers.length > 0 ? (
          <>
            {paginatedAnswers?.map((answer) => {
              const { questionId, email } = answer;
              return (
                <React.Fragment key={email}>
                  <Link href={`/questions/${questionId}/answers/${email}`}>
                    <Card className="w-full">
                      <div className="flex flex-col justify-between h-[90px]">
                        <div className="flex items-center justify-between w-full">
                          <p className="line-clamp-2 txt-base">{answer?.content}</p>
                          <span
                            className="w-[32px] h-[32px] ml-4 inline-block bg-[var(--gray-01)] rounded-full shrink-0 bg-center bg-contain bg-no-repeat"
                            style={{ backgroundImage: `url(${answer?.avatarUrl})` }}
                          ></span>
                        </div>
                        <div className="flex justify-between">
                          <span>
                            <span className="txt-sm !text-[var(--gray-02)] mr-2">
                              {formatDate(answer?.createdAt)}
                            </span>
                            <span className="txt-sm-b !text-[var(--gray-02)]">
                              {answer?.username}
                            </span>
                          </span>
                          <span className="txt-sm !text-[var(--gray-02)] flex">
                            <Heart
                              size={20}
                              stroke="none"
                              style={{
                                fill:
                                  (answer?.likeCount ?? 0) > 0 ? "var(--red)" : "var(--gray-03)",
                              }}
                              className="mr-1"
                            />
                            {answer?.likeCount}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </React.Fragment>
              );
            })}
          </>
        ) : (
          <Empty text="아직 다른 사람들의 답변이 없어요" />
        )}
      </div>
      <Pagination
        pageNumber={pageNumber}
        totalCount={totalCount}
        currentPageBlock={currentPageBlock}
        itemsPerPage={itemsPerPage}
        handleMovePageBlock={(block) => setCurrentPageBlock(block)}
        handleMovePage={(page) => setPage(page)}
      />
    </>
  );
}
