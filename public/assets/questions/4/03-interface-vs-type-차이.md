📘 정의  
interface와 type은 모두 객체의 타입을 정의할 수 있지만, 약간의 차이점이 존재합니다. interface는 확장(extends) 중심이고, type은 유니온, 교차 타입 등에 더 유연합니다.

🎯 주요 사용 목적  
- interface: 객체 구조 정의, 클래스 구현 등  
- type: 유니온/교차 타입 조합, 간결한 정의

💻 코드 예시  
```ts
interface User {
  name: string;
  age: number;
}

type Admin = User & { isAdmin: boolean };
```

🧩 마무리 정리  
단순 객체라면 interface, 복합 조합이 많다면 type을 사용하는 것이 일반적입니다.

📚 추가 학습 자료  
- [TypeScript - type vs interface](https://www.typescriptlang.org/docs/handbook/2/objects.html)
