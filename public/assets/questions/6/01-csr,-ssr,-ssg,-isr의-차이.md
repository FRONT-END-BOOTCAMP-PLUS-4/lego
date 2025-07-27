### 📘 정의

Next.js는 다양한 렌더링 방식(CSR, SSR, SSG, ISR)을 지원하여 페이지 콘텐츠를 언제 어떻게 생성할지 선택할 수 있습니다.

### 🎯 주요 사용 목적

- CSR: 클라이언트 측 렌더링 (SPA)
- SSR: 요청 시 서버에서 HTML 생성
- SSG: 빌드 시 정적 페이지 생성
- ISR: 정적 생성 + 일정 주기 업데이트

### 💻 코드 예시

```tsx
// SSR
export async function getServerSideProps() {
  return { props: { data: "서버에서 생성됨" } };
}

// SSG
export async function getStaticProps() {
  return { props: { data: "빌드시 생성됨" } };
}
```

### 🧩 마무리 정리

Next.js의 유연한 렌더링 전략은 프로젝트 특성(성능, 실시간성, SEO)에 따라 선택할 수 있습니다.

### 📚 추가 학습 자료

- [Next.js Docs - Rendering](https://nextjs.org/docs/basic-features/pages#rendering)
