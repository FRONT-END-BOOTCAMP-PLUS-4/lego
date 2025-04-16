📘 정의  
유틸리티 타입은 기존 타입을 기반으로 새로운 타입을 쉽게 만들 수 있는 내장 헬퍼입니다.

🎯 주요 사용 목적  
- 기존 타입에서 일부 속성 선택/제외  
- 선택적 속성 타입 생성  
- 재사용성과 유지보수 향상

💻 코드 예시  
```ts
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
type UserNameOnly = Pick<User, 'name'>;
type UserWithoutEmail = Omit<User, 'email'>;
```

🧩 마무리 정리  
유틸리티 타입은 타입 조작을 간결하게 만들어주며, 대규모 프로젝트에서 타입 일관성을 유지하는 데 유용합니다.

📚 추가 학습 자료  
- [TypeScript - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
