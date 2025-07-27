### 📘 정의

Lazy Loading은 페이지 로딩 시 이미지나 iframe 등의 리소스를 **사용자 뷰포트에 도달할 때까지 지연**해서 불러오는 기법입니다.

### 🎯 주요 사용 목적

- 초기 로딩 속도 개선
- 네트워크 트래픽 절약
- UX 향상 및 성능 최적화

### 💻 코드 예시

```html
<img src="photo.jpg" loading="lazy" alt="풍경 이미지" />
<iframe src="video.html" loading="lazy"></iframe>
```

### 🧩 마무리 정리

HTML5의 `loading="lazy"` 속성을 사용하면, JS 없이도 간편하게 지연 로딩을 구현할 수 있습니다.

### 📚 추가 학습 자료

- [MDN - lazy loading](https://developer.mozilla.org/ko/docs/Web/Performance/Lazy_loading)
