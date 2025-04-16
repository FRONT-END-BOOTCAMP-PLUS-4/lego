📘 정의  
Next.js는 `.env` 파일을 통해 런타임 환경변수를 설정할 수 있으며, 변수명 앞에 NEXT_PUBLIC을 붙이면 클라이언트에서도 사용 가능합니다.

🎯 주요 사용 목적  
- API Key, DB 접속 정보 보관  
- 환경별 설정 분리 (`.env.development`, `.env.production`)

💻 코드 예시  
```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

```ts
console.log(process.env.NEXT_PUBLIC_API_URL);
```

🧩 마무리 정리  
보안이 필요한 값은 반드시 NEXT_PUBLIC을 붙이지 말고 서버에서만 사용되도록 관리해야 하며, Git에 커밋되지 않도록 `.gitignore` 설정도 필요합니다.

📚 추가 학습 자료  
- [Next.js Docs - Environment Variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
