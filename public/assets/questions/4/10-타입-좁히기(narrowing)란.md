### 📘 정의

타입 좁히기(Narrowing)는 TypeScript에서 `typeof`, `instanceof`, 조건문 등을 통해 **값의 타입을 보다 구체적으로 판별**하는 기법입니다.

### 🎯 주요 사용 목적

- 정확한 타입 기반 로직 분기 처리
- 코드 안정성 향상

### 💻 코드 예시

```ts
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```

### 🧩 마무리 정리

타입 좁히기는 유니언 타입에서 각 타입별로 안전하게 처리하기 위한 핵심 기법입니다.

### 📚 추가 학습 자료

- [TypeScript - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
