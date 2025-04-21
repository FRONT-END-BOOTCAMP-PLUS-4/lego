### 📘 정의

enum은 관련된 상수 값들을 하나의 그룹으로 관리할 수 있는 열거형 타입입니다.

### 🎯 주요 사용 목적

- 명확한 의미의 상수 집합 표현
- 자동 증가 값 또는 커스텀 값 설정 가능

### 💻 코드 예시

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let dir: Direction = Direction.Up;
```

### 🧩 마무리 정리

enum은 코드 가독성과 유지보수를 높여주지만, 런타임에 실제 코드가 생성되므로 주의가 필요하며, const enum을 활용하면 최적화할 수 있습니다.

### 📚 추가 학습 자료

- [TypeScript - Enums](https://www.typescriptlang.org/docs/handbook/enums.html)
