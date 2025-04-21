### 📘 정의

HTML5의 `<canvas>`와 `<svg>`는 모두 그래픽을 표현하기 위한 태그이지만 **렌더링 방식과 활용 목적이 다릅니다.**

### 🎯 주요 사용 목적

- `<canvas>`: 픽셀 기반의 즉각적인 그래픽 처리 (게임, 애니메이션 등)
- `<svg>`: 벡터 기반으로 확대/축소에 유리하며 DOM 조작 가능 (아이콘, 차트 등)

### 💻 코드 예시

```html
<!-- SVG -->
<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="blue" />
</svg>

<!-- Canvas -->
<canvas id="myCanvas" width="100" height="100"></canvas>
<script>
  const ctx = document.getElementById("myCanvas").getContext("2d");
  ctx.fillStyle = "blue";
  ctx.fillRect(10, 10, 80, 80);
</script>
```

### 🧩 마무리 정리

`canvas`는 빠른 렌더링이 강점이고, `svg`는 유지보수와 인터랙션 측면에서 유리합니다. 상황에 따라 적절한 선택이 중요합니다.

### 📚 추가 학습 자료

- [MDN - canvas vs svg](https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Basic_usage)
