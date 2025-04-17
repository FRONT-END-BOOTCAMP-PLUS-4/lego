import Link from "next/link";
import React from "react";


export default function LoginPage() {
    return (
      <main className="flex flex-col items-center justify-center">
        <div className="w-[448px] h-[660px] flex flex-col justify-center">
          <div className="h-[380px]">
            <div className="h-[200px] flex flex-col justify-center items-center">
              <img src="/image/Logo.svg" className="w-[82px] h-[82px]"/>
              <h1 className="txt-4xl-b mb-[8px]" style={{color: 'var(--blue-01)'}}>소셜 로그인</h1>
              <p className="text-center">기존에 사용하는 계정으로<br/>간단하게 로그인 하세요</p>
            </div>
            <div className="h-[180px] mt-[24px] flex flex-col items-center justify-center">
              <div className="  mb-[24px]">
                <button className="flex items-center justify-center w-[345px] h-[54px] border-1 border-solid mb-[8px] py-[15px] cursor-pointer rounded-md border-black">
                  <img className="w-[24px] h-[24px] mr-[8px]" src="/image/Github.svg"/>
                  <span className="txt-lg">Continue with Github</span>
                </button>
                <button className="flex items-center justify-center w-[345px] h-[54px] border-2 border-solid py-[15px] cursor-pointer rounded-md">
                  <img className="w-[24px] h-[24px] mr-[8px]" src="/image/Google.svg"/>
                  <span className="txt-lg">Continue with Google</span>
                </button>
              </div>
              
              <Link href="/admin" className="txt-sm w-[78px]" style={{textDecoration: 'underline', color: 'var(--gray-02)'}}>
                관리자 로그인
              </Link>
              
            </div>
          </div>
        </div>
      </main>
    );
  }