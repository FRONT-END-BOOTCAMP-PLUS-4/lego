### 📘 정의

z-index는 요소의 쌓임 순서를 설정하는 속성입니다. 숫자가 클수록 위에 쌓입니다. 그러나 조건에 따라 무시될 수 있습니다.

### 🎯 주요 사용 목적

- 레이어(UI) 겹침 순서 조정
- 모달, 드롭다운, 툴팁 등의 우선순위 설정

### 💻 코드 예시

```css
.box {
  position: relative;
  z-index: 10;
}
```

### 🧩 마무리 정리

z-index는 position이 static이면 적용되지 않으며, stacking context에 따라 예상과 다르게 동작할 수 있으므로 생성 조건을 숙지해야 합니다.

### 📚 추가 학습 자료

- [MDN - z-index](https://developer.mozilla.org/ko/docs/Web/CSS/z-index)
