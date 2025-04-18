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
import { CategoryDto } from "@/application/usecase/category/dto/CategoryDto";

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
                        <SelectItem value="latest">북마크 순</SelectItem>
                        <SelectItem value="popular">조회순</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-[44px]" />
        </div>
    )
}