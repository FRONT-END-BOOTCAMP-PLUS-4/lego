📘 정의  
call, apply, bind는 함수의 this를 **명시적으로 설정**하여 실행하거나 새로운 함수를 반환하는 메서드입니다.

🎯 주요 사용 목적  
- 특정 this 값으로 함수 실행  
- 매개변수 전달 방식에 따른 유연한 호출  
- 이벤트 핸들러에서 컨텍스트 고정

💻 코드 예시  
```js
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}
const user = { name: "Kim" };

greet.call(user, "Hi");
greet.apply(user, ["Hello"]);
const boundGreet = greet.bind(user);
boundGreet("Hey");
```

🧩 마무리 정리  
call, apply는 즉시 실행하며, bind는 새로운 함수를 반환하여 나중에 실행할 수 있게 합니다.

📚 추가 학습 자료  
- [MDN - call/apply/bind](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_objects/Function)
