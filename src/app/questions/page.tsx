"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Pagination } from "@/components/ui/pagination";
import { CategoryDto } from "@/application/usecase/category/dto/CategoryDto";
import { QuestionDto } from "@/application/usecase/question/dto/QuestionDto";

export default function QuestionListPage() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionDto[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const [pageNumber, setPageNumber] = useState(1);
  const [currentPageBlock, setCurrentPageBlock] = useState(1);

  const categoryIdFromURL = searchParams.get("categoryId");
  const selectedCategoryId = categoryIdFromURL ? Number(categoryIdFromURL) : null;

  const selectedCategoryName =
    selectedCategoryId === null
      ? "전체"
      : categories.find((c) => c.id === selectedCategoryId)?.name ?? "전체";

  const getImageUrlByCategory = (categoryId: number) =>
    `/assets/images/category/${categoryId}.svg`;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        const data = await res.json();
        setCategories(data.categories);
      } catch (err) {
        console.error("카테고리 불러오기 실패", err);
      }
    };
    fetchCategories();
  }, []);

  const fetchQuestions = async (categoryId?: number) => {
    const url = categoryId
      ? `/api/questions?categoryId=${categoryId}`
      : `/api/questions`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setQuestions(data);
      setFilteredQuestions([]); // 새로 가져올 때 필터 초기화
    } catch (err) {
      console.error("문제 불러오기 실패", err);
    }
  };

  useEffect(() => {
    const categoryId = categoryIdFromURL ? Number(categoryIdFromURL) : undefined;
    fetchQuestions(categoryId);
  }, [categoryIdFromURL]);

  const handleCategoryChange = (name: string) => {
    const category = categories.find((c) => c.name === name);
    setPageNumber(1);
    setSearchKeyword("");
    setFilteredQuestions([]);

    if (category) {
      router.push(`/questions?categoryId=${category.id}`);
    } else {
      router.push(`/questions`);
    }
  };

  const handleSearch = () => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) {
      setFilteredQuestions([]);
      return;
    }
    const matched = questions.filter((q) =>
      q.content.toLowerCase().includes(keyword)
    );
    setFilteredQuestions(matched);
    setPageNumber(1);
  };

  const visibleQuestions = filteredQuestions.length > 0 ? filteredQuestions : questions;
  const totalCount = visibleQuestions.length;
  const startIdx = (pageNumber - 1) * 10;
  const endIdx = startIdx + 10;
  const pagedQuestions = visibleQuestions.slice(startIdx, endIdx);

  return (
    <div className="w-[948px] container mx-auto pt-[40px] md:px-6">
      <div className="relative w-[948px] h-[115px] mb-6">
        <Image
          src="/banner.png"
          alt="배너 이미지"
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="mb-[48px]" />

      <div className="flex items-center gap-4">
        <Input
          placeholder="면접 문제 검색"
          className="w-[824px] h-[54px] px-4 text-sm flex-1"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button
          variant="outline"
          size="default"
          className="w-[115px] h-[54px] px-6 text-lg"
          onClick={handleSearch}
        >
          문제 검색
        </Button>
      </div>

      <div className="mb-[12px]" />

      <div className="flex items-center gap-2 mb-6">
        <Select
          onValueChange={handleCategoryChange}
          value={selectedCategoryName}
        >
          <SelectTrigger className="w-[204px] h-[40px] text-[var(--black)]">
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="전체">전체</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[204px] h-[40px] text-[var(--black)]">
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">북마크한 문제</SelectItem>
            <SelectItem value="views">조회순</SelectItem>
            <SelectItem value="answers">답변한 문제</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-[44px]" />

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

      <div className="flex flex-col gap-[16px]">
        {pagedQuestions.map((question) => (
          <Card key={question.id} className="h-[74px]">
            <div className="flex h-full items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={getImageUrlByCategory(question.categoryId)}
                  alt="문"
                  width={32}
                  height={32}
                  className="rounded-md"
                />
                <span className="txt-2xl-b">{question.content}</span>
              </div>
              <div className="flex items-center gap-4 text-[14px] font-bold leading-[150%] text-[var(--gray-02)]">
                <span>조회수 {question.views}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Pagination
        totalCount={totalCount}
        itemsPerPage={10}
        pageNumber={pageNumber}
        currentPageBlock={currentPageBlock}
        handleMovePage={setPageNumber}
        handleMovePageBlock={setCurrentPageBlock}
      />
    </div>
  );
}
