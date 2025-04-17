📘 정의  
JavaScript에서 this는 **현재 실행 중인 코드가 속한 객체**를 참조하며, 호출 방식에 따라 바인딩 대상이 결정됩니다.

🎯 주요 사용 목적  
- 메서드 호출 시 객체 참조  
- 이벤트 핸들러나 콜백에서 context 유지  
- 명시적 바인딩 (call, apply, bind) 처리

💻 코드 예시  
```js
const obj = {
  name: "JS",
  say: function () {
    console.log(this.name);
  },
};

obj.say(); // JS
```

🧩 마무리 정리  
this는 호출 방식에 따라 바인딩이 결정되며, 특히 arrow function에서는 상위 스코프의 this를 따릅니다.

📚 추가 학습 자료  
- [MDN - this](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)
