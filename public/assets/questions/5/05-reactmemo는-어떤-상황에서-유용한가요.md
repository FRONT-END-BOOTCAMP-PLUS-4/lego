### 📘 정의

React.memo는 컴포넌트를 메모이제이션하여, props가 변경되지 않으면 리렌더링을 방지하는 고차 컴포넌트입니다.

### 🎯 주요 사용 목적

- 동일한 props로 불필요한 렌더링 방지
- 리스트 아이템, 성능 최적화 대상 컴포넌트

### 💻 코드 예시

```jsx
const Item = React.memo(({ value }) => {
  return <div>{value}</div>;
});
```

### 🧩 마무리 정리

React.memo는 가벼운 컴포넌트보다 무거운 연산을 포함한 컴포넌트에서 효과가 큽니다.

### 📚 추가 학습 자료

- [React 공식 문서 - React.memo](https://reactjs.org/docs/react-api.html#reactmemo)
