📘 정의  
useEffect는 React 컴포넌트에서 부수 효과(side effect)를 처리하기 위한 훅입니다. 데이터 fetch, 이벤트 리스너, 타이머 설정 등에 사용됩니다.

🎯 주요 사용 목적  
- 컴포넌트 마운트/언마운트 시 동작 처리  
- 외부 API 호출  
- 상태 변화에 따른 동작 수행

💻 코드 예시  
```jsx
useEffect(() => {
  document.title = "Hello";
}, []);
```

🧩 마무리 정리  
useEffect는 의존성 배열을 통해 호출 조건을 명확히 설정할 수 있으며, 클린업 함수를 활용해 메모리 누수를 방지합니다.

📚 추가 학습 자료  
- [React 공식 문서 - useEffect](https://reactjs.org/docs/hooks-effect.html)
