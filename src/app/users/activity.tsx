import React, { useState } from "react";
import GitHubCalendar from "react-github-calendar";
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import MyAnswer from "./myAnswer";


export default function Activity() {
    const [selectedTab, setSelectedTab] = useState();
    const [selectedYear, setSelectedYear] = useState<'lastYear' | 'current'>('current');
    const currentYear = new Date().getFullYear();
    const selectYear = selectedYear === 'current' ? currentYear : currentYear - 1;
    return(
        <>
            <div className="flex items-center mt-[24px] justify-between w-[948px]">
                <Tabs className="">
                    <TabsList>
                        <TabsTrigger className="txt-lg" value="myAnswer">내답변</TabsTrigger>
                        <TabsTrigger className="txt-lg" value="bookmark">북마크</TabsTrigger>
                        <TabsTrigger className="txt-lg" value="likeOfAnswer">좋아요 한 답변</TabsTrigger>
                        <TabsTrigger className="txt-lg" value="comment">댓글</TabsTrigger>
                    </TabsList>
                </Tabs>
                <Select onValueChange={(value: 'lastYear' | 'current') => setSelectedYear(value)}>
                    <SelectTrigger>
                    <SelectValue placeholder={selectYear} />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="lastYear">{currentYear - 1}</SelectItem>
                    <SelectItem value="current">{currentYear}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="mt-[50px] w-[948px] h-[136px] rounded-lg" style={{background: 'var(--blue-04)'}}>
                <div className="flex ">
                    <div className="w-[124px] h-[70px] mx-[24px] my-[32px] flex flex-col items-center">
                        <span>내가 답변한 문제 수</span>
                        <p className="txt-4xl-b">0</p>
                    </div>
                    <div className="mt-[50px]">
                        <img src="/assets/image/Bar.svg" className="h-[58px]" />
                    </div>
                    <div className="w-[124px] h-[70px]  my-[32px] flex flex-col items-center">
                        <span>나의 활동 일</span>
                        <p className="txt-4xl-b">0</p>
                    </div>
                </div>
            </div>
            <div className="mt-[50px] w-[980px] flex flex-col">
                <h3 className="mb-[10px] ml-[10px] txt-lg-b">일일 활동 기록</h3>
                <div className="self-center">
                    <GitHubCalendar username="who" year={selectYear}/>
                </div>
            </div>
            {/* <MyAnswer></MyAnswer> */}
        </>
    )
}