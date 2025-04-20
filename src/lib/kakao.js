import fetch from "node-fetch";

// access_token 임시 생성
const ACCESS_TOKEN = "bec7RMcV3Y-r7GxI4CFgbwJwKKMfVjQIAAAAAQoXEO8AAAGWU62UagGXonZVdqHq";
const question = "질문 제목";
const questionId = 1;

async function sendKakaoMessage() {
  const res = await fetch("https://kapi.kakao.com/v2/api/talk/memo/default/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      template_object: JSON.stringify({
        object_type: "text",
        text: `✅ 오늘의 질문: ${question}`,
        link: {
          web_url: `https://localhost:3000/questions/${questionId}`,
        },
      }),
    }),
  });

  const result = await res.json();
  console.log("카카오 응답:", result);
}

sendKakaoMessage();
