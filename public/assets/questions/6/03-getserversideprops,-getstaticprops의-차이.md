### 📘 정의

`getServerSideProps`는 서버에서 매 요청 시 데이터를 가져오고, `getStaticProps`는 빌드 시 데이터를 가져와 정적으로 페이지를 생성합니다.

### 🎯 주요 사용 목적

- getServerSideProps: 사용자 요청에 따라 변경되는 데이터
- getStaticProps: 자주 변경되지 않는 콘텐츠, 빠른 로딩

### 💻 코드 예시

```tsx
// SSR
export async function getServerSideProps() {
  return { props: { data: "server-side" } };
}

// SSG
export async function getStaticProps() {
  return { props: { data: "static" } };
}
```

### 🧩 마무리 정리

SSR은 매 요청마다, SSG는 빌드시 한 번만 실행되어 성능과 실시간성 사이에서 선택할 수 있습니다.

### 📚 추가 학습 자료

- [Next.js Docs - Data Fetching](https://nextjs.org/docs/basic-features/data-fetching)
