📘 정의  
CSS Grid는 2차원(행과 열) 기반의 레이아웃 시스템으로, 복잡한 레이아웃을 명확하고 직관적으로 구성할 수 있게 해줍니다.

🎯 주요 사용 목적  
- 대규모 레이아웃 설계 (카드형, 대시보드 등)  
- 영역 기반 배치 구현  
- 행/열 정렬 및 정교한 간격 설정

💻 코드 예시  
```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

🧩 마무리 정리  
Grid는 Flexbox보다 구조적인 설계에 적합하며, 특히 반복적이거나 대칭적인 레이아웃 구성에 뛰어납니다.

📚 추가 학습 자료  
- [MDN - Grid](https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Grid_Layout)
