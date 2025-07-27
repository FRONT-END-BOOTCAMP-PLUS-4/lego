### 📘 정의

`never` 타입은 **절대 발생하지 않는 값**을 의미하며, 함수가 종료되지 않거나 오류를 던지는 경우 등에 사용됩니다.

### 🎯 주요 사용 목적

- 항상 오류를 던지는 함수
- 무한 루프 등 절대 반환되지 않는 함수
- exhaustive check를 위한 switch 문

### 💻 코드 예시

```ts
function throwError(): never {
  throw new Error("Error occurred");
}
```

### 🧩 마무리 정리

never는 잘못된 상태를 검출하거나 예외 처리 로직에 활용되며, 타입 시스템의 안전성을 높이는 데 사용됩니다.

### 📚 추가 학습 자료

- [TypeScript - never](https://www.typescriptlang.org/docs/handbook/2/functions.html#never)
