import React from "react";


export default function LoginPage() {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full text-center space-y-6">
            
          {/* 헤더 텍스트 */}
          <div className="flex flex-col items-center justify-center">
            <img src="/image/Logo.svg" className="w-[80px] h-[80px]" />
            <h1 className="text-4xl font-bold" style={{color: 'var(--blue-01)'}}>소셜 로그인</h1>
            <p className="">기존에 사용하는 계정으로<br/>간단하게 로그인 하세요</p>
          </div>
  
          {/* 로그인 버튼들 */}
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center border border-gray-300 rounded-full py-2 text-sm font-medium hover:bg-gray-50 transition">
              <img src="/image/Github.svg" className="w-[24px] h-[24px]"/>

              Continue with Github
            </button>
            <button className="w-full flex items-center justify-center border border-gray-300 rounded-full py-2 text-sm font-medium hover:bg-gray-100 transition">
              <img src="/image/Google.svg" className="w-[24px] h-[24px]"/>
              Continue with Google
            </button>
          </div>
  
        </div>
      </main>
    );
  }