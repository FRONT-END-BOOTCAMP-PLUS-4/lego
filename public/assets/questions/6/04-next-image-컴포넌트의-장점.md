📘 정의  
`next/image`는 Next.js에서 제공하는 이미지 최적화 컴포넌트로, 자동 사이즈 조절, lazy loading 등을 지원합니다.

🎯 주요 사용 목적  
- 성능 최적화 (WebP, Lazy Load 등)  
- 반응형 이미지 처리  
- 자동 width/height 처리

💻 코드 예시  
```tsx
import Image from 'next/image';

<Image src="/banner.png" alt="배너" width={600} height={400} />
```

🧩 마무리 정리  
`next/image`는 사용자 경험과 SEO를 동시에 향상시킬 수 있는 유용한 도구로, 기본 img 태그보다 많은 이점을 제공합니다.

📚 추가 학습 자료  
- [Next.js Docs - Image](https://nextjs.org/docs/api-reference/next/image)
