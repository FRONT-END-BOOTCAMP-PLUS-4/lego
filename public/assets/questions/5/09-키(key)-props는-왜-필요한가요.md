### 📘 정의

key는 React가 어떤 항목이 변경, 추가 또는 제거되었는지를 식별할 수 있게 해주는 고유한 값입니다.

### 🎯 주요 사용 목적

- 리스트 렌더링에서 효율적인 diffing
- 재사용 최적화
- 렌더링 오류 방지

### 💻 코드 예시

```jsx
<ul>
  {items.map((item) => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

### 🧩 마무리 정리

key는 React 내부의 reconciliation 과정에서 핵심적인 역할을 하며, 반드시 고유한 값이어야 합니다.

### 📚 추가 학습 자료

- [React 공식 문서 - Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)
