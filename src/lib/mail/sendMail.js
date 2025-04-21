import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { marked } from "marked";
import { createTemplate } from "./createTemplate.js";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

// 날짜에 따라 질문 파일 불러오기
function getTodayQuestion() {
  const totalQuestions = 60;
  const startDate = new Date("2024-01-01");
  const today = new Date();
  const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const index = diffDays % totalQuestions;

  const category = Math.floor(index / 10) + 1;
  const questionNum = (index % 10) + 1;

  const categoryDir = path.join(process.cwd(), "public", "assets", "questions", `${category}`);
  const { filename, filepath } = findQuestionFile(categoryDir, questionNum);

  const content = fs.readFileSync(filepath, "utf-8").trim();

  const rawTitle = filename.replace(/\.md$/, "");
  const subject = rawTitle.replace(/^\d+-/, "").replace(/-/g, " ");

  return {
    subject: `오늘의 질문 - ${subject}`,
    body: content,
    // 아이디를 어떻게 전달할 것인가...
    // link: `http://localhost:3000/questions/${category}/${questionNum}`,
    link: `http://localhost:3000/questions/${category}`,
  };
}

function findQuestionFile(categoryDir, questionNum) {
  const files = fs.readdirSync(categoryDir);
  const targetPrefix = `${questionNum.toString().padStart(2, "0")}-`;
  const matched = files.find((f) => f.startsWith(targetPrefix));
  if (!matched) {
    throw new Error(`질문 파일을 찾을 수 없습니다: ${categoryDir}/${targetPrefix}`);
  }
  return {
    filename: matched,
    filepath: path.join(categoryDir, matched),
  };
}

// 구독자 이메일 조회
async function getSubscribedEmails() {
  const { data, error } = await supabase.from("subscribe").select("email");
  if (error) throw new Error("구독자 이메일 조회 실패");
  return data.map((item) => item.email);
}

// Gmail SMTP 설정
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// 메일 발송
async function sendDailyQuestionMail() {
  const { subject, body, link } = getTodayQuestion();
  const recipients = await getSubscribedEmails();

  const html = createTemplate(marked.parse(body), link);

  for (const email of recipients) {
    await transporter.sendMail({
      from: `"레고" <${process.env.GMAIL_USER}>`,
      to: email,
      subject,
      text: body,
      html,
    });
    console.log(`${email} 에게 메일 전송 완료`);
  }

  console.log(`총 ${recipients.length}명에게 질문 발송 완료`);
}

sendDailyQuestionMail().catch((err) => {
  console.error("메일 발송 중 오류 발생:", err);
});
