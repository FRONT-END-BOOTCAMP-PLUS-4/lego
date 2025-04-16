📘 정의  
Zustand와 Redux는 둘 다 전역 상태 관리 라이브러리지만, 구조와 사용 방식에서 차이가 있습니다.

🎯 주요 사용 목적  
- Redux: 복잡한 상태 흐름, 미들웨어 필요 시  
- Zustand: 가볍고 직관적인 상태 공유

💻 코드 예시  
```ts
// Zustand
const useStore = create(set => ({ count: 0, increase: () => set(state => ({ count: state.count + 1 })) }));

// Redux는 action, reducer, dispatch 구조 필요
```

🧩 마무리 정리  
Zustand는 러닝 커브가 낮고 설정이 간단해 작은 프로젝트에 적합하며, Redux는 복잡한 상태 흐름에 적합합니다.

📚 추가 학습 자료  
- [Zustand 공식 문서](https://zustand-demo.pmnd.rs/)
- [Redux 공식 문서](https://redux.js.org/)
