import { Badge } from "@/components/ui/badge";
import React from "react";

export default function MyAnswer() {
    return(
        <>
            <div className="w-[948px] h-[230px]" style={{background:'var(--blue-04)'}}>
                <div className="flex">
                    <Badge>JavaScript</Badge>
                    <h1 className="txt-3xl-b">HTTP 메소드에 대한 설명</h1>
                </div>
                <span>
                    <p>문제 내용 DB에서 가져와야 합니다.</p>
                </span>
            </div>
        </>
    )
}