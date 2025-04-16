📘 정의  
제네릭은 타입을 함수나 클래스, 인터페이스에서 **외부에서 주입받도록** 만드는 방법입니다. 재사용성과 유연성이 높아집니다.

🎯 주요 사용 목적  
- 타입을 매개변수화  
- 재사용 가능한 함수/컴포넌트 생성  
- 런타임이 아닌 컴파일 타임에 타입 검증

💻 코드 예시  
```ts
function identity<T>(value: T): T {
  return value;
}

identity<number>(123);
identity<string>("hello");
```

🧩 마무리 정리  
제네릭은 다양한 데이터 타입을 처리할 수 있도록 도와주며, 타입 안정성을 유지하면서도 코드 중복을 줄여줍니다.

📚 추가 학습 자료  
- [TypeScript - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
