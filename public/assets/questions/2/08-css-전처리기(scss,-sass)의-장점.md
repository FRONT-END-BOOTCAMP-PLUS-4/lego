📘 정의  
CSS 전처리기는 변수, 중첩, 믹스인 등을 지원하는 CSS 확장 언어로, 작성된 코드를 CSS로 컴파일해 사용합니다.

🎯 주요 사용 목적  
- 코드 재사용성 향상 (변수, 믹스인)  
- 코드 구조 개선 (중첩, 분리, 모듈화)  
- 유지보수 효율 증대

💻 코드 예시  
```scss
$primary-color: #007bff;

.button {
  background-color: $primary-color;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
```

🧩 마무리 정리  
SCSS, SASS는 CSS의 반복적이고 비효율적인 코드를 개선하는 도구로, 복잡한 프로젝트일수록 큰 효과를 발휘합니다.

📚 추가 학습 자료  
- [Sass 공식 문서](https://sass-lang.com/)
