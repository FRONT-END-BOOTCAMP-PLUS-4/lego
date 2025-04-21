export function createTemplate(markdownHtml, linkUrl) {
  return `
      <div style="max-width: 600px; margin: 40px auto; padding: 24px; border: 1px solid #eee; border-radius: 8px; font-family: Arial, sans-serif; background-color: #fff;">
        <h2 style="text-align: center; color: #333;">오늘의 기술면접 질문</h2>
        <hr style="margin: 20px 0;" />
        <div style="color: #333; font-size: 15px; line-height: 1.6;">
          ${markdownHtml}
        </div>
        <div style="text-align: center; margin-top: 30px;">
          <a href="${linkUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            👉 질문 보러 가기
          </a>
        </div>
        <hr style="margin: 32px 0;" />
        <p style="text-align: center; font-size: 12px; color: #aaa;">
          레고(Lego) - 매일 아침 기술면접 질문을 전달해드려요.
        </p>
      </div>
    `;
}
