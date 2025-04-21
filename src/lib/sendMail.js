import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendMail() {
  await transporter.sendMail({
    from: `"레고" <${process.env.GMAIL_USER}>`,
    to: "maruon95@gmail.com",
    subject: "오늘의 기술면접 질문",
    text: "오늘의 질문: useEffect는 어떤 역할을 할까요?",
  });

  console.log("✅ 메일 발송 완료");
}

sendMail().catch(console.error);
