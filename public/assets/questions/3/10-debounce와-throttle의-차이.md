📘 정의  
debounce는 **짧은 시간 내 반복 호출을 지연**, throttle은 **일정 주기로 함수 실행을 제한**하는 기술입니다.

🎯 주요 사용 목적  
- 입력창 자동완성, 스크롤 이벤트 성능 최적화  
- 반복 호출 방지로 퍼포먼스 향상  
- 서버 요청 또는 DOM 업데이트 최소화

💻 코드 예시  
```js
// debounce
function debounce(fn, delay) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

// throttle
function throttle(fn, limit) {
  let lastCall = 0;
  return () => {
    const now = new Date().getTime();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn();
    }
  };
}
```

🧩 마무리 정리  
두 함수는 고빈도 이벤트 제어를 위한 필수 도구로, 상황에 따라 적절히 선택하여 성능을 개선할 수 있습니다.

📚 추가 학습 자료  
- [CSS Tricks - Debounce vs Throttle](https://css-tricks.com/debouncing-throttling-explained-examples/)
