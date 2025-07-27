### 📘 정의

JavaScript에서 `var`, `let`, `const`는 변수를 선언하는 키워드이며, 스코프, 재할당 가능 여부, 호이스팅 방식에 차이가 있습니다.

### 🎯 주요 사용 목적

- `var`: 함수 스코프, 재선언 가능 (사용 자제 권장)
- `let`: 블록 스코프, 재할당 가능
- `const`: 블록 스코프, 재할당 불가

### 💻 코드 예시

```js
var x = 1;
let y = 2;
const z = 3;

y = 4; // 가능
z = 5; // ❌ 오류
```

### 🧩 마무리 정리

모던 JavaScript에서는 `var` 대신 `let`과 `const`를 사용하며, 재할당이 필요 없을 경우 `const`가 권장됩니다.

### 📚 추가 학습 자료

- [MDN - var, let, const](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/var)
