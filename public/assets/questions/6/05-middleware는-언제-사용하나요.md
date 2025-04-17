📘 정의  
Middleware는 요청이 처리되기 전에 실행되는 함수로, 인증, 리다이렉트, 헤더 설정 등의 작업을 수행할 수 있습니다.

🎯 주요 사용 목적  
- 인증 검사 및 조건부 라우팅  
- 글로벌 요청 전처리  
- 요청 리다이렉션, 응답 수정

💻 코드 예시  
```ts
export function middleware(req) {
  const isLoggedIn = Boolean(req.cookies.token);
  if (!isLoggedIn) {
    return Response.redirect('/login');
  }
}
```

🧩 마무리 정리  
Middleware는 페이지 렌더링 이전에 동작하기 때문에 빠른 보안 및 라우팅 처리가 가능하며, app 디렉토리에서도 활용됩니다.

📚 추가 학습 자료  
- [Next.js Docs - Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
