📘 정의  
useRouter는 Next.js의 라우터 객체를 사용하는 훅으로, 현재 경로 정보, 쿼리스트링, 라우팅 함수를 제공합니다.

🎯 주요 사용 목적  
- 현재 URL 정보 추적  
- 프로그래밍 방식 라우팅 (router.push 등)  
- 쿼리 파라미터 추출

💻 코드 예시  
```tsx
import { useRouter } from 'next/router';

const router = useRouter();
console.log(router.query.id);
```

🧩 마무리 정리  
useRouter는 페이지 내부에서 라우팅 정보를 활용하거나 동적 이동이 필요할 때 자주 사용됩니다.

📚 추가 학습 자료  
- [Next.js Docs - useRouter](https://nextjs.org/docs/api-reference/next/router)
