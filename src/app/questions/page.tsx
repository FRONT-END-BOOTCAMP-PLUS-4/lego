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
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export default function QuestionListPage() {
  // ====================== 상태 관리 ======================

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
  const user = useAuthStore((state) => state.user);
  const usesrEmail = user?.email;

  const sortOption = (searchParams.get("sortBy") as "recent" | "bookmark") ?? "recent";
  const filterOption = (searchParams.get("filter") as "all" | "bookmarked" | "answered") ?? "all";

  const selectedCategoryName =
    selectedCategoryId === null
      ? "전체"
      : (categories.find((c) => c.id === selectedCategoryId)?.name ?? "전체");

  const getImageUrlByCategory = (categoryId: number) => `/assets/images/category/${categoryId}.svg`;

  // ====================== 카테고리 목록 가져오기 ======================

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

  // ====================== 질문 리스트 가져오기 ======================

  useEffect(() => {
    const fetchSortedQuestions = async () => {
      let email: string | undefined = undefined;
  
      try {
        const authStorage = localStorage.getItem("auth-storage");
        if (authStorage) {
          const parsed = JSON.parse(authStorage);
          email = parsed?.state?.user?.email;
        }
      } catch (err) {
        console.error("auth-storage 파싱 오류:", err);
      }
  
      const currentSort = searchParams.get("sortBy") ?? "recent";
      const currentFilter = searchParams.get("filter") ?? "all";
      const currentCategoryId = searchParams.get("categoryId");
  
      const params = new URLSearchParams(searchParams.toString());
  
      // 📌 북마크 or 답변 필터일 경우 email 파라미터 강제로 붙임
      if ((currentFilter === "bookmarked" || currentFilter === "answered") && email) {
        params.set("email", email);
      } else {
        params.delete("email");
      }
  
      const url = new URL("/api/questions", window.location.origin);
      params.forEach((value, key) => url.searchParams.set(key, value));
  
      const res = await fetch(url.toString());
      let data: QuestionDto[] = await res.json();
  
      // 클라이언트 추가 정렬/필터
      if (currentFilter === "bookmarked" || currentFilter === "answered") {
        if (currentCategoryId) {
          data = data.filter((q) => q.categoryId === Number(currentCategoryId));
        }
  
        if (currentSort === "bookmark") {
          data.sort((a, b) => b.bookmark_count - a.bookmark_count);
        } else {
          data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          );
        }
      }
  
      setQuestions(data);
      setFilteredQuestions([]);
    };
  
    fetchSortedQuestions();
  }, [searchParams.toString()]);

  // ====================== 이벤트 핸들러 ======================

  const handleCategoryChange = (name: string) => {
    const category = categories.find((c) => c.name === name);
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("categoryId", category.id.toString());
    } else {
      params.delete("categoryId");
    }

    router.push(`/questions?${params.toString()}`);
    setPageNumber(1);
    setSearchKeyword("");
    setFilteredQuestions([]);
  };

  const handleFilterChange = (filter: "all" | "bookmarked" | "answered") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", filter);
  
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      const email = parsed?.state?.user?.email;
      if (filter === "bookmarked" || filter === "answered") {
        if (email) {
          params.set("email", email);
        }
      } else {
        params.delete("email");
      }
    }
  
    router.push(`/questions?${params.toString()}`);
    setPageNumber(1);
  };

  const handleSortClick = (sortBy: "recent" | "bookmark") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sortBy);
    router.push(`/questions?${params.toString()}`);
    setPageNumber(1);
  };

  const handleSearch = () => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (!keyword) {
      setFilteredQuestions([]);
      return;
    }
    const matched = questions.filter((q) => q.content.toLowerCase().includes(keyword));
    setFilteredQuestions(matched);
    setPageNumber(1);
  };

  useEffect(() => {
    const updateURLWithEmail = async () => {
      const filter = searchParams.get("filter");
      const emailFromURL = searchParams.get("email");
  
      if ((filter === "bookmarked" || filter === "answered") && !emailFromURL) {
        const authStorage = localStorage.getItem("auth-storage");
        if (authStorage) {
          const parsed = JSON.parse(authStorage);
          const email = parsed?.state?.user?.email;
          if (email) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("email", email);
            router.push(`/questions?${params.toString()}`);
          }
        }
      }
    };
  
    updateURLWithEmail();
  }, []);

  // ====================== 페이지네이션 데이터 ======================

  const visibleQuestions = filteredQuestions.length > 0 ? filteredQuestions : questions;
  const totalCount = visibleQuestions.length;
  const startIdx = (pageNumber - 1) * 10;
  const endIdx = startIdx + 10;
  const pagedQuestions = visibleQuestions.slice(startIdx, endIdx);

  // ====================== 렌더링 ======================

  return (
    <div className="w-[948px] container mx-auto pt-[40px] md:px-6">

      {/* 배너 */}
      <div className="relative w-[948px] h-[115px] mb-6">
        <Image src="/banner.png" alt="배너 이미지" fill className="object-cover rounded-md" />
      </div>

      <div className="mb-[48px]" />

      {/* 검색창 */}
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

      {/* 카테고리 & 필터 선택 */}
      <div className="flex items-center gap-2 mb-6">
        <Select onValueChange={handleCategoryChange} value={selectedCategoryName}>
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

        <Select onValueChange={handleFilterChange} value={filterOption}>
          <SelectTrigger className="w-[204px] h-[40px] text-[var(--black)]">
            <SelectValue placeholder="필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="bookmarked">북마크한 문제</SelectItem>
            <SelectItem value="answered">답변한 문제</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-[44px]" />

      {/* 정렬 옵션 */}
      <div className="flex items-center justify-between">
        <h2 className="txt-lg-b">문제</h2>
        <div className="flex gap-[12px]">
          <Button
            variant={sortOption === "bookmark" ? "default" : "ghost"}
            size="sm"
            className="font-normal"
            onClick={() => handleSortClick("bookmark")}
          >
            인기순
          </Button>
          <Button
            variant={sortOption === "recent" ? "default" : "ghost"}
            size="sm"
            className="font-normal"
            onClick={() => handleSortClick("recent")}
          >
            최신순
          </Button>
        </div>
      </div>

      <div className="mb-[12px]" />

      {/* 문제 리스트 출력 */}
      <div className="flex flex-col gap-[16px]">
        {pagedQuestions.map((question) => (
          <Link
            key={question.id}
            href={
              usesrEmail
                ? `/questions/${question.id}?userId=${usesrEmail}`
                : `/questions/${question.id}`
            }
          >
            <Card className="h-[74px]">
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
                <span>북마크한 사람 {question.bookmark_count}</span>
                <span>답변을 완료한 사람 {question.answer_count}</span>
              </div>
              </div>
            </Card>
          </Link>
              
        ))}
      </div>

      {/* 페이지네이션 */}
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
