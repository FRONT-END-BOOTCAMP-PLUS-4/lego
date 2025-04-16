📘 정의  
API Routes는 Next.js에서 서버리스 API를 작성할 수 있는 기능으로, 파일 기반으로 RESTful API를 구현할 수 있습니다.

🎯 주요 사용 목적  
- 백엔드 없이 간단한 API 작성  
- 인증, DB 요청, 외부 API 프록시 처리

💻 코드 예시  
```ts
// pages/api/hello.ts
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from API Route' });
}
```

🧩 마무리 정리  
API Routes는 프론트와 백엔드가 통합된 풀스택 개발을 가능하게 하며, 서버리스 환경에서 빠르게 API를 구현할 수 있게 합니다.

📚 추가 학습 자료  
- [Next.js Docs - API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)
