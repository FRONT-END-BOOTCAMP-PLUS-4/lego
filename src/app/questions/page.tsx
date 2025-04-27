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
import Empty from "../components/Empty";
import NotFound from "../loading";

export default function QuestionListPage() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [questions, setQuestions] = useState<QuestionDto[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionDto[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsString = searchParams.toString();

  const filter = searchParams.get("filter");
  const emailFromURL = searchParams.get("email");
  const sortBy = searchParams.get("sortBy") ?? "recent";
  const keywordFromURL = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const currentCategoryId = searchParams.get("categoryId");

  const [pageNumber, setPageNumber] = useState(1);
  const [currentPageBlock, setCurrentPageBlock] = useState(1);

  const categoryIdFromURL = searchParams.get("categoryId");
  const selectedCategoryId = categoryIdFromURL ? Number(categoryIdFromURL) : null;
  const user = useAuthStore((state) => state.user);
  const userEmail = user?.email;

  const [selectedSort, setSelectedSort] = useState<"bookmark" | "recent">("recent");

  const filterOption = (filter as "all" | "bookmarked" | "answered") ?? "all";

  // ✅ 추가
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    if (user !== undefined) {
      setUserChecked(true);
    }
  }, [user]);

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
    setIsLoading(true);

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

      const params = new URLSearchParams(paramsString);

      if ((filter === "bookmarked" || filter === "answered") && email) {
        params.set("email", email);
      } else {
        params.delete("email");
      }

      const url = new URL("/api/questions", window.location.origin);
      params.forEach((value, key) => url.searchParams.set(key, value));

      const res = await fetch(url.toString());
      let data: QuestionDto[] = await res.json();

      if (!isCurrent) return;

      if (filter === "bookmarked" || filter === "answered") {
        if (currentCategoryId) {
          data = data.filter((q) => q.categoryId === Number(currentCategoryId));
        }

        if (sortBy === "bookmark") {
          data.sort((a, b) => b.bookmark_count - a.bookmark_count);
        } else {
          data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
      }

      data = Array.from(new Map(data.map((q) => [q.id, q])).values());

      setQuestions(data);
      setFilteredQuestions([]);
      setIsLoading(false);
    };

    fetchSortedQuestions();

    return () => {
      isCurrent = false;
    };
  }, [paramsString, router, filter, sortBy, currentCategoryId]);

  useEffect(() => {
    setSearchKeyword(keywordFromURL);

    if (keywordFromURL && questions.length > 0) {
      const matched = questions.filter((q) => q.content.toLowerCase().includes(keywordFromURL));
      setFilteredQuestions(matched);
      setPageNumber(1);
    } else {
      setFilteredQuestions([]);
    }
  }, [questions, keywordFromURL]);

  useEffect(() => {
    if ((filter === "bookmarked" || filter === "answered") && !emailFromURL) {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        const email = parsed?.state?.user?.email;
        if (email) {
          const params = new URLSearchParams(paramsString);
          params.set("email", email);
          router.push(`/questions?${params.toString()}`);
        }
      }
    }
  }, [filter, emailFromURL, paramsString, router]);

  const throttledHandleCategoryChange = throttle((name: string) => {
    const category = categories.find((c) => c.name === name);
    const params = new URLSearchParams(paramsString);

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
    const params = new URLSearchParams(paramsString);
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
    setSelectedSort(sortBy);
    const params = new URLSearchParams(paramsString);
    params.set("sortBy", sortBy);
    router.push(`/questions?${params.toString()}`);
    setPageNumber(1);
  };

  const handleSearch = () => {
    const keyword = searchKeyword.trim().toLowerCase();
    const params = new URLSearchParams(paramsString);

    if (keyword) {
      params.set("search", keyword);
    } else {
      params.delete("search");
    }

    router.push(`/questions?${params.toString()}`);
    setPageNumber(1);
  };

  const hasKeyword = searchParams.get("search")?.trim().toLowerCase();
  const isSearching = !!hasKeyword;
  const visibleQuestions = isSearching ? filteredQuestions : questions;

  const totalCount = visibleQuestions.length;
  const startIdx = (pageNumber - 1) * 10;
  const endIdx = startIdx + 10;
  const pagedQuestions = visibleQuestions.slice(startIdx, endIdx);
  return (
    <div className="w-full container mx-auto pt-[40px]">
      <div className="relative w-full max-w-[948px] h-[115px] mb-6 overflow-hidden md:h-[115px] sm:h-[80px]">
        <Image
          src="/assets/images/banner.svg"
          alt="배너 이미지"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 948px"
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="면접 문제 검색"
          className="w-full h-[54px] px-4 text-sm flex-1"
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

      <div className="flex flex-row items-center gap-2 mb-6 justify-center sm:justify-start">
        <Select onValueChange={throttledHandleCategoryChange} value={selectedCategoryName}>
          <SelectTrigger className="w-[45vw] h-[40px] text-[var(--black)] sm:w-[204px]">
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
            <SelectTrigger className="w-[45vw] h-[40px] text-[var(--black)] sm:w-[204px]">
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


      <div className="flex items-center justify-between mb-[12px]">
        <h2 className="txt-lg-b">문제</h2>
        <div className="flex">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleSortClick("bookmark")}
          className={selectedSort === "bookmark" ? "!text-[var(--black)]" : ""}
        >
          인기순
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleSortClick("recent")}
          className={selectedSort === "recent" ? "!text-[var(--black)]" : ""}
        >
          최신순
        </Button>
      </div>
      </div>

      <div className="flex justify-center min-h-[300px]">
        {isLoading || !userChecked ? ( // ✅ isLoading이거나 userChecked가 false면 대기
          <NotFound />
        ) : visibleQuestions.length > 0 ? (
          <div className="flex flex-col gap-3 w-full">
            {pagedQuestions.map((question) => {
              const questionLink = userEmail
                ? `/questions/${question.id}?userId=${userEmail}`
                : `/questions/${question.id}`;

                console.log("[디버그] 이동할 링크:", questionLink);

                return (
                  <Link
                    key={question.id}
                    href={questionLink}
                  >
                    <Card className="cursor-pointer">
                      <div className="flex h-full items-center justify-between">
                      {/* 왼쪽 (이미지 + 문제 제목) */}
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <Image
                            src={getImageUrlByCategory(question.categoryId)}
                            alt="문제 카테고리"
                            width={32}
                            height={32}
                            className="rounded-md flex-shrink-0"
                          />
                          <span className="txt-xl-b line-clamp-1">
                            {question.content}
                          </span>
                        </div>

                      {/* 오른쪽 (북마크/답변 수) */}
                        <div className="flex flex-shrink-0 flex-col items-end gap-1 font-bold leading-[150%] text-[14px] text-[var(--gray-02)] sm:flex-row sm:items-center sm:gap-4">
                          <span>북마크 {question.bookmark_count}</span>
                          <span>답변 {question.answer_count}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
            })}
          </div>
        ) : (
          <Empty text="조건에 해당하는 문제가 없습니다 👻" />
        )}
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
