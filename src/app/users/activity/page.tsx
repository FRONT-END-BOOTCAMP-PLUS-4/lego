'use client'
import React from "react";
import GitHubCalendar from "react-github-calendar";
import { UnderlineTab } from "@/components/ui/underLinetab";
import MyPage from "./mypage";

export default function Mypage() {
    const getYear = new Date().getFullYear();
    const [activeIndex, setActiveIndex] = React.useState(0)
    console.log(getYear)
    const activity = <GitHubCalendar username="who" year={getYear}/>
    const edit = <MyPage></MyPage>

    return(
        <>
            <main>
                <UnderlineTab item={['나의 활동', '계정 관리']} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                    {activeIndex === 0 && activity}
                    {activeIndex === 1 && edit}
                    </UnderlineTab>
            </main>
        </>
    )
}