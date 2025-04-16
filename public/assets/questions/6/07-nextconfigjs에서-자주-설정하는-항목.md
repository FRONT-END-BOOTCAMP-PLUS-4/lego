📘 정의  
`next.config.js`는 Next.js 앱의 전역 설정을 정의하는 파일입니다. 빌드, 이미지 도메인, 환경변수 등을 설정할 수 있습니다.

🎯 주요 사용 목적  
- 이미지 외부 도메인 설정  
- 환경변수 및 리다이렉트  
- Webpack 커스터마이징

💻 코드 예시  
```js
module.exports = {
  images: {
    domains: ['images.unsplash.com'],
  },
  env: {
    CUSTOM_KEY: 'value',
  },
};
```

🧩 마무리 정리  
next.config.js는 앱 전반에 영향을 주는 설정파일로, 초기 구성과 배포 환경 설정에 핵심적인 역할을 합니다.

📚 추가 학습 자료  
- [Next.js Docs - Configuration](https://nextjs.org/docs/api-reference/next.config.js/introduction)
