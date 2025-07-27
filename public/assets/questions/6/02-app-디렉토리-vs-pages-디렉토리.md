### 📘 정의

Next.js에서는 13버전부터 `app` 디렉토리를 도입하여, 기존의 `pages` 디렉토리와 함께 라우팅을 구성할 수 있습니다.

### 🎯 주요 사용 목적

- `pages`: 기존 파일 기반 라우팅 (기존 방식)
- `app`: 레이아웃 기반, React Server Component 활용 가능

### 💻 코드 예시

```tsx
// pages/index.tsx
export default function Home() {
  return <div>기존 방식</div>;
}

// app/page.tsx
export default function Page() {
  return <div>새로운 방식</div>;
}
```

### 🧩 마무리 정리

`app` 디렉토리는 더 정교한 구조화와 서버 컴포넌트 활용을 지원하며, 향후 기본 방식으로 자리 잡을 예정입니다.

### 📚 추가 학습 자료

- [Next.js Docs - App Directory](https://nextjs.org/docs/app/building-your-application/routing)
