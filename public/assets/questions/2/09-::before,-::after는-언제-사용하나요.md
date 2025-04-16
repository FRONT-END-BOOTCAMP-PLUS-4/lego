📘 정의  
`::before`와 `::after`는 가상 요소(Pseudo-elements)로, HTML에 없는 요소를 스타일링을 통해 추가할 수 있습니다.

🎯 주요 사용 목적  
- 장식 요소 추가 (아이콘, 따옴표 등)  
- 시각적 효과 구현 (라인, 뱃지 등)  
- DOM 수정 없이 콘텐츠 확장

💻 코드 예시  
```css
.button::before {
  content: "🔥";
  margin-right: 4px;
}
```

🧩 마무리 정리  
가상 요소는 비주얼 UI를 세련되게 다듬을 수 있는 강력한 수단이며, 시멘틱 마크업을 유지하면서 꾸미기를 가능하게 합니다.

📚 추가 학습 자료  
- [MDN - ::before](https://developer.mozilla.org/ko/docs/Web/CSS/::before)
