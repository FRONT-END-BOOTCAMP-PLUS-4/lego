export function createTemplate(markdownHtml, linkUrl) {
  return `
      <div style="max-width: 640px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="text-align: center; color: #111;">오늘의 기술면접 질문</h2>
        <hr />
  
        <div style="font-size: 15px; color: #222; line-height: 1.6;">
          ${markdownHtml}
        </div>
  
        <div style="text-align: center; margin-top: 32px;">
          <a href="${linkUrl}" style="
            background: #2563eb;
            color: white;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 6px;
            display: inline-block;
            font-size: 14px;
          ">👉 질문 보러 가기</a>
        </div>
  
        <hr style="margin-top: 40px;" />
        <p style="text-align: center; color: #999; font-size: 12px;">
          레고 – 매일 아침 기술면접 질문을 전달해드립니다.
        </p>
  
        <style>
          h3 {
            color: #111;
            margin-top: 24px;
            margin-bottom: 8px;
            font-size: 16px;
          }
  
          pre {
            background: #f5f5f5;
            padding: 16px;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 13px;
          }
  
          code {
            font-family: Consolas, Monaco, 'Courier New', monospace;
          }
  
          ul {
            margin: 0 0 20px 20px;
            padding: 0;
          }
  
          li {
            margin-bottom: 4px;
          }
  
          a {
            color: #2563eb;
          }
        </style>
      </div>
    `;
}
