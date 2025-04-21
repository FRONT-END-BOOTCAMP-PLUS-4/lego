### 📘 정의

useState는 상태가 변경되면 컴포넌트를 리렌더링하지만, useRef는 값이 변경되어도 렌더링되지 않으며 DOM에 접근하는 데도 사용됩니다.

### 🎯 주요 사용 목적

- useState: 상태 기반 렌더링 제어
- useRef: DOM 참조, 렌더링과 무관한 값 보존

### 💻 코드 예시

```jsx
const [count, setCount] = useState(0);
const inputRef = useRef(null);
```

### 🧩 마무리 정리

렌더링과 관련된 값은 useState, 단순 참조 또는 렌더링과 무관한 값은 useRef를 사용하는 것이 일반적입니다.

### 📚 추가 학습 자료

- [React 공식 문서 - useRef](https://reactjs.org/docs/hooks-reference.html#useref)
