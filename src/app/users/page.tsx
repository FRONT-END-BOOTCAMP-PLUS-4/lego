'use client'
import React from "react";
import { UnderlineTab } from "@/components/ui/underLinetab";
import MyPage from "./profile";
import Activity from "./activity";
import MyAnswer from "./myAnswer";
export default function Mypage() {
    
    const [activeIndex, setActiveIndex] = React.useState(0);
    const activity = <Activity></Activity>
    const edit = <MyPage></MyPage>;

    return(
        <main className="w-[980px] h-[660px]  m-auto">
            <h1 className="txt-2xl-b mb-[50px]" style={{color: '0F172A'}}>마이 페이지</h1>
            <UnderlineTab item={['나의 활동', '계정 관리']} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
                {activeIndex === 0 && activity}
                {activeIndex === 1 && edit}
            </UnderlineTab>
            
        </main>
    )
}