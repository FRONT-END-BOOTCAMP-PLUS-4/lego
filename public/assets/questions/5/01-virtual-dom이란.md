### 📘 정의

Virtual DOM은 실제 DOM의 가벼운 사본으로, 변경 사항을 메모리에서 먼저 계산한 뒤 실제 DOM에 최소한의 변경만 적용하는 방식입니다.

### 🎯 주요 사용 목적

- 렌더링 성능 최적화
- 변경사항을 효율적으로 계산 및 적용
- 불필요한 DOM 조작 방지

### 💻 코드 예시

```jsx
const element = <h1>Hello, world!</h1>;
ReactDOM.render(element, document.getElementById("root"));
```

### 🧩 마무리 정리

Virtual DOM은 DOM 조작 비용을 줄이고, React의 선언형 UI 렌더링 철학을 가능하게 해주는 핵심 기술입니다.

### 📚 추가 학습 자료

- [React 공식 문서 - Virtual DOM](https://reactjs.org/docs/faq-internals.html)
