### 📘 정의

Controlled 컴포넌트는 React 상태로 값을 제어하고, Uncontrolled는 DOM 자체에서 값을 관리합니다.

### 🎯 주요 사용 목적

- Controlled: 양방향 바인딩, 유효성 검사 필요 시
- Uncontrolled: 간단한 폼 요소, 빠른 구현

### 💻 코드 예시

```jsx
// Controlled
<input value={value} onChange={e => setValue(e.target.value)} />

// Uncontrolled
<input ref={inputRef} />
```

### 🧩 마무리 정리

대부분의 경우 Controlled 컴포넌트를 추천하지만, 파일 업로드나 빠른 초기화가 필요한 경우 Uncontrolled도 활용됩니다.

### 📚 추가 학습 자료

- [React 공식 문서 - Forms](https://reactjs.org/docs/forms.html)
