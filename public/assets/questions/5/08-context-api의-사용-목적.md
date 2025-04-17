📘 정의  
Context API는 전역 상태를 하위 컴포넌트에 props 없이 전달할 수 있게 해주는 기능입니다.

🎯 주요 사용 목적  
- 다단계 컴포넌트 간 상태 전달  
- 테마, 로그인 상태, 언어 설정 등 공유 데이터 관리

💻 코드 예시  
```jsx
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

🧩 마무리 정리  
Context는 리덕스 등 외부 상태관리 도구 없이 간단하게 전역 상태를 공유할 수 있는 React의 내장 기능입니다.

📚 추가 학습 자료  
- [React 공식 문서 - Context](https://reactjs.org/docs/context.html)
