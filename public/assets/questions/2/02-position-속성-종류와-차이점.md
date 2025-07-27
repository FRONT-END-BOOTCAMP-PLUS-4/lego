### 📘 정의

CSS의 position 속성은 요소를 문서 내에서 어떻게 배치할지를 정의하며, `static`, `relative`, `absolute`, `fixed`, `sticky` 다섯 가지 값이 있습니다.

### 🎯 주요 사용 목적

- 기준 위치를 설정하거나 문서 흐름을 제어
- 스크롤 고정 UI, 레이어 팝업, 툴팁 구현 등
- 부모 기준 절대 배치 (absolute + relative)

### 💻 코드 예시

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 10px;
  left: 20px;
}
```

### 🧩 마무리 정리

position 속성은 요소를 원하는 위치에 정확히 배치하기 위한 기본 도구로, 각 값의 기준점과 문서 흐름에 대한 이해가 필수입니다.

### 📚 추가 학습 자료

- [MDN - position](https://developer.mozilla.org/ko/docs/Web/CSS/position)
