import { Badge } from "@/components/ui/badge";
import React from "react";

export default function MyAnswer() {
    return(
        <>
            <div className="w-[948px] h-[230px] px-[36px] py-[24px] border-1 border-gray rounded-xl" style={{background:'var(--blue-04)'}}>
                <div className="flex items-center mb-[4px]">
                    <Badge className="mr-[16px] h-[34px]">JavaScript</Badge> {/*카테고리 이름 가져오기*/}
                    <h1 className="txt-3xl-b">HTTP 메소드에 대한 설명</h1>
                </div>
                <span className="block mb-[4px] h-[94px]">
                    <p>Next.js는 버전 13부터 React 18에서 도입된 서버 컴포넌트를 지원하고 있습니다. 시간이 흐르면서 많은 분이 이를 익숙하게 활용하고 있지만, 저처럼 개념Next.js는 버전 13부터 React 18에서 도입된 서버 컴포넌트를 지원하고 있습니다. 시간이 흐르면서 많은 분이 이를 익숙 ...</p>
                </span>
                <div className="flex justify-between">
                    <time>날짜</time>
                    <span>좋아요</span>
                </div>
            </div>
        </>
    )
}