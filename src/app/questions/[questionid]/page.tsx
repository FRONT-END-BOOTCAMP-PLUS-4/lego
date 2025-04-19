"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/store/useAuthStore";
import { useSearchParams } from "next/navigation";

interface Props {
  params: {
    questionid: string;
  };
}
export default function AnswerFormPage({ params }: Props) {
  // const questionId = Number(params?.questionid);
  const searchParams = useSearchParams();
  console.log("searchParams", searchParams);
  const [tab, setTab] = useState<string>("tab1");
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const contentRef = useRef<string>("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const handleToggleBookmark = () => setIsBookmarked((prev) => !prev);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    contentRef.current = e.target.value;
  };

  //이전에 작성한 답변 불러오기

  //답변 저장
  const handleSaveAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = contentRef.current;
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    // const { user } = useAuthStore();
    console.log(content);
    const formData = {
      userId: "leekjoo1008@gmail.com",
      questionId: 1,
      content,
    };
    console.log(formData);
    try {
      const response = await fetch(`/api/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      console.log("ss", response);
      if (!response.ok) {
        throw new Error("답변 저장 실패");
      }
      alert("답변이 저장되었습니다.");
      setIsSubmit(true);
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      alert("답변 저장 실패: " + (error as Error).message);
    }
  };

  //답변 삭제
  const handleDeleteAnswer = async () => {
    console.log("ss");
    //답변 삭제여부 확인 추가하기
    try {
      const response = await fetch(`/api/answers`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user?.id,
        }),
      });
      if (!response.ok) {
        throw new Error("답변 삭제 실패");
      }
      alert("답변이 삭제되었습니다.");
      contentRef.current = "";
    } catch (error) {
      console.error("저장 중 오류 발생:", error);
      alert("답변 저장 실패: " + (error as Error).message);
    }
  };

  //답변 수정
  const handleEditContent = async () => {
    const content = contentRef.current;
    if (isEditing) {
      const formData = {
        userId: user?.email,
        questionId: 1,
        content,
      };
      try {
        const response = await fetch(`/api/answers`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("답변 변경 실패");
        }
        alert("답변이 변경되었습니다.");
        setIsSubmit(true);
      } catch (error) {
        console.error("변경 저장 중 오류 발생:", error);
        alert("답변 변경 실패: " + (error as Error).message);
      }
    }
  };

  return (
    <div className="w-[1270px] container mx-auto pt-[40px]">
      <header className="flex justify-between items-center pb-[18px]">
        <div className="flex items-center pb-[18px]">
          <Badge className="mr-[16px]">Javascript</Badge>
          <h3 className="txt-3xl-b">HTTP 메소드에 대한 설명</h3>
        </div>
        <div
          className="flex items-center justify-center w-[32px] h-[32px]"
          onClick={handleToggleBookmark}
        >
          <Image
            src={`/assets/icons/bookmark${isBookmarked ? "_fill" : ""}.svg`}
            alt="bookmark icon"
            width={24}
            height={24}
            className={`w-[24px] h-[24px] object-center cursor-pointer ${isBookmarked && "w-[28px] h-[28px]"}`}
          />
        </div>
      </header>

      <form onSubmit={handleSaveAnswer}>
        <Tabs defaultValue="tab1" value={tab} onValueChange={setTab}>
          <TabsList className="mr-0 ml-auto">
            <TabsTrigger value="tab1">나의 답변 작성하기</TabsTrigger>
            <TabsTrigger value="tab2">모범 답안 확인하기</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <textarea
              className="box-border p-[24px] h-[500px] border border-[var(--blue-03)] radius mt-6 w-full resize-none focus:ring-1 focus:ring-[var(--blue-03)] focus:outline-none"
              placeholder="내용을 입력하세요..."
              onChange={handleInputChange}
            ></textarea>
          </TabsContent>
          <TabsContent value="tab2">
            <textarea
              className="box-border p-[24px] h-[500px] border border-[var(--blue-03)] radius mt-6 w-full resize-none focus:ring-1 focus:ring-[var(--blue-03)] focus:outline-none"
              readOnly
              value={"답안내용"}
            ></textarea>
          </TabsContent>
        </Tabs>
        <div className="flex justify-center mt-[24px]">
          {isSubmit && (
            <div className="flex gap-2">
              <Button variant="outline" size="lg" type="button" onClick={handleEditContent}>
                {isEditing ? "수정" : "저장"}
              </Button>
              <Button variant="gray" size="lg" type="button" onClick={handleDeleteAnswer}>
                삭제
              </Button>
            </div>
          )}
          {!isSubmit && (
            <Button size="lg" type="submit">
              저장
            </Button>
          )}
        </div>
      </form>
      <div className="pt-[150px] pb-[150px]">
        <h3 className="txt-2xl-b pb-6">다른 사람 답변 확인하기</h3>
        <div className="grid grid-cols-2 grid-rows-auto gap-x-16 gap-y-24">
          <Card>
            <div className="flex gap-4 items-center mb-6">
              <p className="line-clamp-2">
                s not simply random text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginiaer 2000 years old. Richard McClintock, a Latin
                professor at Hampden-Sydney College in Virginia
              </p>
              <span className="w-[32px] h-[32px] inline-block bg-[var(--gray-01)] rounded-full shrink-0"></span>
            </div>
            <div className="flex justify-between">
              <span>
                <span className="txt-sm !text-[var(--gray-02)] mr-2">2020.20.20</span>
                <span className="txt-sm !text-[var(--gray-02)]">작성자 이름</span>
              </span>
              <span className="txt-sm !text-[var(--gray-02)]">좋아요 100</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
