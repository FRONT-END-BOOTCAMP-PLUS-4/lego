"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { CategoryDto } from "@/application/usecase/category/dto/CategoryDto";
import { Pagination } from "@/components/ui/pagination";

export default function QuestionListPage(){
  const [categories, setCategories] = useState<CategoryDto[]>([]);

  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        const data = await res.json();

        // 서버에서 CategoryListDto 형태로 오므로 .categories 접근
        setCategories(data.categories);
      } catch (err) {
        console.error("카테고리 불러오기 실패", err);
      }
    };

    fetchCategories();
  }, []);

  const mockQuestions = [
    {
      id: 1,
      imageUrl: "/assets/images/category/3.svg",
      title: "JavaScript의 클로저란?",
      savedCount: 24,
      answeredCount: 18,
    },
    {
      id: 2,
      imageUrl: "/assets/images/category/5.svg",
      title: "React의 useEffect는 언제 실행되나요?",
      savedCount: 35,
      answeredCount: 27,
    },
  ];

  // 상태 선언
  const [pageNumber, setPageNumber] = useState(1);
  const [currentPageBlock, setCurrentPageBlock] = useState(1);
  const itemsPerPage = 10;

  const totalCount = mockQuestions.length;
  const startIdx = (pageNumber - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const pagedQuestions = mockQuestions.slice(startIdx, endIdx);

    return(
        <div className="w-[948px] container mx-auto pt-[40px] md:px-6">
            {/* 배너 영역 */}
            <div className="relative w-[948px] h-[115px] mb-6">
                <Image
                    src="/banner.png" // public/banner.png 위치에 이미지 파일을 넣으세요
                    alt="배너 이미지"
                    fill
                    className="object-cover rounded-md"
                />
            </div>

            <div className="mb-[48px]" />

            {/* 검색 영역 */}
            <div className="flex items-center gap-4">
                <Input
                    placeholder="면접 문제 검색"
                    className="w-[824px] h-[54px] px-4 text-sm flex-1"
                />
                <Button
                    variant="outline"
                    size="default"
                    className="w-[115px] h-[54px] px-6 text-lg"
                >
                    문제 검색
                </Button>
            </div>

            <div className="mb-[12px]" />

             {/* Select 박스 영역 */}
            <div className="flex items-center gap-2 mb-6">
                <Select>
                    <SelectTrigger className="w-[204px] h-[40px] text-[var(--black)]">
                        <SelectValue placeholder="전체" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger className="w-[204px] h-[40px] text-[var(--black)]">
                        <SelectValue placeholder="전체" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="latest">북마크순</SelectItem>
                        <SelectItem value="views">조회순</SelectItem>
                        <SelectItem value="answers">답변 많은 순</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="mb-[44px]" />

            {/* 문제 제목 + 정렬 버튼 */}
            <div className="flex items-center justify-between">
                <h2 className="txt-lg-b">문제</h2>
                <div className="flex gap-[12px]">
                    <Button variant="ghost" size="sm" className="font-normal">
                        인기순
                    </Button>
                    <Button variant="ghost" size="sm" className="font-normal">
                        최신순
                    </Button>
                </div>
            </div>

            <div className="mb-[12px]" />

            {/* 문제 리스트 카드들 */}
            <div className="flex flex-col gap-[16px]">
                {mockQuestions.map((question) => (
                    <Card key={question.id} className="h-[74px]">
                        <div className="flex h-full items-center justify-between">
                            {/* 왼쪽: 이미지 + 텍스트 */}
                            <div className="flex items-center gap-4">
                                <Image
                                    src={question.imageUrl}
                                    alt="문"
                                    width={32}
                                    height={32}
                                    className="rounded-md"
                                />
                                <span className="txt-2xl-b">{question.title}</span>
                            </div>

                            <div className="flex items-center gap-4 text-[14px] font-bold leading-[150%] text-[var(--gray-02)]">
                                <span>문제를 저장한 사람 {question.savedCount}</span>
                                <span>답변을 완료한 사람 {question.answeredCount}</span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="mb-[150px]" />  
            
            {/* 마지막에 Pagination 컴포넌트*/}
            <Pagination
                totalCount={totalCount}
                itemsPerPage={itemsPerPage}
                pageNumber={pageNumber}
                currentPageBlock={currentPageBlock}
                handleMovePage={setPageNumber}
                handleMovePageBlock={setCurrentPageBlock}
            />     
        </div>
    )
}