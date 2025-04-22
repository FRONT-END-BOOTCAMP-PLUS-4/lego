"use client";
import throttle from "lodash.throttle";
import Image from "next/image";
import Link from "next/link";
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
import { useAuthStore } from "@/store/useAuthStore";

export default function QuestionListPage() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionDto[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ====================== URL 파라미터 추출 ======================
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

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true); // 로딩 시작

    const fetchSortedQuestions = async () => {
      let email: string | undefined = undefined;

      try {
        const authStorage = localStorage.getItem("auth-storage");
        if (authStorage) {
          const parsed = JSON.parse(authStorage);
          email = parsed?.state?.user?.email;
          setIsLoggedIn(!!email);
        }
      } catch (err) {
        console.error("auth-storage 파싱 오류:", err);
        setIsLoggedIn(false);
      }

      const currentSort = searchParams.get("sortBy") ?? "recent";
      const currentFilter = searchParams.get("filter") ?? "all";
      const currentCategoryId = searchParams.get("categoryId");

      const params = new URLSearchParams(searchParams.toString());

      if ((currentFilter === "bookmarked" || currentFilter === "answered") && email) {
        params.set("email", email);
      } else {
        params.delete("email");
      }

      const url = new URL("/api/questions", window.location.origin);
      params.forEach((value, key) => url.searchParams.set(key, value));

      const res = await fetch(url.toString());
      let data: QuestionDto[] = await res.json();

      if (!isCurrent) return;

      if (currentFilter === "bookmarked" || currentFilter === "answered") {
        if (currentCategoryId) {
          data = data.filter((q) => q.categoryId === Number(currentCategoryId));
        }

        if (currentSort === "bookmark") {
          data.sort((a, b) => b.bookmark_count - a.bookmark_count);
        } else {
          data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
      }

      // ✅ 중복 제거
      data = Array.from(new Map(data.map((q) => [q.id, q])).values());

      setQuestions(data);
      setFilteredQuestions([]);
      setIsLoading(false); // 로딩 끝
    };

    fetchSortedQuestions();

    return () => {
      isCurrent = false;
    };
  }, [searchParams.toString()]);

  // ====================== Throttled 이벤트 핸들러 ======================

  const throttledHandleCategoryChange = throttle((name: string) => {
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
  }, 500);

  const throttledHandleFilterChange = throttle((filter: "all" | "bookmarked" | "answered") => {
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
  }, 500);

  const handleSortClick = (sortBy: "recent" | "bookmark") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", sortBy);
    router.push(`/questions?${params.toString()}`);
    setPageNumber(1);
  };

  const handleSearch = () => {
    const keyword = searchKeyword.trim().toLowerCase();
    const params = new URLSearchParams(searchParams.toString());
  
    if (keyword) {
      params.set("search", keyword);
    } else {
      params.delete("search");
    }
  
    router.push(`/questions?${params.toString()}`);
    setPageNumber(1);
  };

  useEffect(() => {
    const keywordFromURL = searchParams.get("search")?.trim().toLowerCase() ?? "";
    setSearchKeyword(keywordFromURL);
  
    if (keywordFromURL && questions.length > 0) {
      const matched = questions.filter((q) =>
        q.content.toLowerCase().includes(keywordFromURL)
      );
      setFilteredQuestions(matched);
      setPageNumber(1);
    } else {
      setFilteredQuestions([]);
    }
  }, [questions, searchParams]);

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

  const visibleQuestions = filteredQuestions.length > 0 ? filteredQuestions : questions;
  const totalCount = visibleQuestions.length;
  const startIdx = (pageNumber - 1) * 10;
  const endIdx = startIdx + 10;
  const pagedQuestions = visibleQuestions.slice(startIdx, endIdx);

  return (
    <div className="w-[948px] container mx-auto pt-[40px] md:px-6">
      {/* 배너 */}
      <div className="relative w-[948px] h-[115px] mb-6 overflow-hidden">
        <Image
          src="/assets/images/banner.svg"
          alt="배너 이미지"
          fill
          priority
          sizes="948px"
          className="object-cover rounded-md"
        />
      </div>

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

      {/* 검색창 하단 마진 */}
      <div className="mb-[12px]" />

      {/* 카테고리 & 필터 선택 */}
      <div className="flex items-center gap-2 mb-6">
        <Select onValueChange={throttledHandleCategoryChange} value={selectedCategoryName}>
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

        {isLoggedIn && (
          <Select onValueChange={throttledHandleFilterChange} value={filterOption}>
            <SelectTrigger className="w-[204px] h-[40px] text-[var(--black)]">
              <SelectValue placeholder="필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="bookmarked">북마크한 문제</SelectItem>
              <SelectItem value="answered">답변한 문제</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* 정렬 옵션 */}
      <div className="flex items-center justify-between mb-[12px]">
        <h2 className="txt-lg-b">문제</h2>
        <div className="flex gap-[12px]">
          <Button variant="ghost" size="sm" onClick={() => handleSortClick("bookmark")}>
            인기순
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleSortClick("recent")}>
            최신순
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-[16px] min-h-[300px]">
  {isLoading ? (
    // 🔄 로딩 중
    <div className="flex justify-center items-center py-20">
      <Image
        src="/assets/images/QuestionsLoading.png"
        alt="문제 로딩 중"
        width={240}
        height={240}
        className="animate-pulse" // 선택: 살짝 동적 효과 줄 수도 있어
      />
    </div>
  ) : pagedQuestions.length > 0 ? (
    // ✅ 문제 있음
    pagedQuestions.map((question) => (
      <Link key={question.id} href={`/questions/${question.id}`}>
        <Card className="cursor-pointer hover:shadow-md transition-shadow duration-200">
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
    ))
  ) : (
    // ❌ 문제 없음
    <div className="flex flex-col items-center justify-center mt-10 text-center">
      <Image
        src="/assets/images/QuestionsNotFound.png"
        alt="결과 없음"
        width={240}
        height={240}
      />
    </div>
  )}
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
