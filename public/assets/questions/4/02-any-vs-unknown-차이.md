📘 정의  
`any`와 `unknown`은 모두 모든 타입을 허용하는 특수 타입이지만, `unknown`은 타입 안전성을 보장하기 위해 사용됩니다.

🎯 주요 사용 목적  
- `any`: 어떤 값이든 허용하지만, 타입 검사 없음  
- `unknown`: 어떤 값이든 허용하지만, 사용 전 타입 검사 필요

💻 코드 예시  
```ts
let valueAny: any = 123;
let valueUnknown: unknown = "hello";

valueAny.toUpperCase(); // 가능
// valueUnknown.toUpperCase(); // 오류

if (typeof valueUnknown === "string") {
  valueUnknown.toUpperCase(); // 타입 가드로 허용
}
```

🧩 마무리 정리  
가능하면 `any` 대신 `unknown`을 사용하여 타입 안정성을 확보하는 것이 좋습니다.

📚 추가 학습 자료  
- [TypeScript - unknown](https://www.typescriptlang.org/docs/handbook/2/the-big-overview.html)
