### 📘 정의

`<form>` 태그는 사용자로부터 입력을 받아 서버로 전송하기 위한 HTML 태그입니다.

### 🎯 주요 사용 목적

- 로그인, 검색, 회원가입 등 사용자 입력 수집
- 다양한 입력 필드와 함께 사용 가능
- 서버 전송 방식 지정 (GET/POST)

### 💻 코드 예시

```html
<form action="/submit" method="POST">
  <label for="name">이름</label>
  <input type="text" id="name" name="name" required />
  <button type="submit">제출</button>
</form>
```

### 🧩 마무리 정리

폼은 사용자와 서버 간 데이터 상호작용의 출발점이며, 입력 검증과 접근성도 함께 고려해야 합니다.

### 📚 추가 학습 자료

- [MDN - form](https://developer.mozilla.org/ko/docs/Web/HTML/Element/form)
