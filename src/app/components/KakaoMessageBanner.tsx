export default function KakaoMessageBanner() {
  return (
    <section className="mb-[100px]" data-aos="fade-up">
      <div className="bg-[var(--blue-03)] flex justify-center items-start px-4 py-10">
        <div className="w-full max-w-screen-sm rounded-[24px] bg-[var(--white)] p-3 relative shadow-md">
          <div className="bg-white rounded-lg overflow-hidden text-sm">
            <div className="bg-[var(--yellow)] font-semibold px-4 py-1.5">알림톡 도착</div>
            <div className="px-4 py-2.5 text-black leading-snug space-y-1">
              <strong className="txt-2xl-b">카톡으로 간편하게</strong>
              <p>기술면접을 준비해요!</p>
              <p>■ 주문번호: 2311220-11</p>
              <p>■ 준비물: 마음가짐</p>
              <p>마이페이지에서 주문 정보를 확인해주세요.</p>
            </div>
            <div className="border-t px-4 py-2">
              <button className="w-full bg-gray-100 text-sm font-medium rounded-md py-1.5">
                주문내역 확인하기
              </button>
            </div>
          </div>
          <div className="absolute top-[-10px] right-[-10px] bg-black text-white text-xs px-2 py-0.5 rounded-full">
            kakao
          </div>
        </div>
      </div>
    </section>
  );
}
