'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function MyPage() {
  const [tab, setTab] = useState<'activity' | 'account'>('account');

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col">
      {/* 상단 바 */}
      <header className="flex items-center px-6 py-4 bg-white shadow">
        <Image src="/image/Logo.svg" alt="LEGo Logo" width={40} height={40} />
        <h1 className="ml-2 text-2xl font-bold">LEGo</h1>
      </header>

      <main className="flex flex-col items-center flex-1 mt-10">
        <h2 className="text-2xl font-semibold mb-6">마이 페이지</h2>

        {/* 탭 */}
        <div className="flex mb-8 border-b border-gray-300">
          <button
            className={`px-4 py-2 font-medium ${tab === 'activity' ? 'border-b-2 border-black' : 'text-gray-400'}`}
            onClick={() => setTab('activity')}
          >
            나의 활동
          </button>
          <button
            className={`px-4 py-2 font-medium ${tab === 'account' ? 'border-b-2 border-black' : 'text-gray-400'}`}
            onClick={() => setTab('account')}
          >
            계정 관리
          </button>
        </div>

        {/* 프로필 */}
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full bg-gray-300" />
          <button className="absolute bottom-1 right-1 w-7 h-7 bg-black text-white rounded-full text-sm flex items-center justify-center">
            ✏️
          </button>
        </div>

        {/* 폼 */}
        <form className="w-[400px] flex flex-col gap-6">
          <div>
            <label className="text-sm text-gray-600 block mb-1">이메일</label>
            <input
              type="email"
              placeholder="이메일"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-sm text-gray-600 block mb-1">아이디</label>
              <input
                type="text"
                placeholder="아이디"
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <button
              type="button"
              className="mt-5 px-3 py-2 text-sm border border-blue-500 text-blue-500 rounded"
            >
              수정하기
            </button>
          </div>

          {/* 카카오 알림 */}
          <div className="flex items-center gap-2">
            <Image src="/kakao-icon.svg" alt="Kakao" width={24} height={24} />
            <span className="text-sm">카카오로 매일 문제 받기</span>
          </div>

          <button
            type="submit"
            className="bg-blue-900 text-white py-2 rounded font-semibold"
          >
            등록 하기
          </button>
        </form>
      </main>

      {/* 푸터 */}
      <footer className="bg-white mt-20 p-6 text-center text-sm text-gray-500">
        <p className="font-semibold">LE-go</p>
        
      </footer>
    </div>
  );
}
