import fs from "fs";
import path from "path";

function getTodayQuestion() {
  const totalQuestions = 60;
  const startDate = new Date("2024-01-01");
  const today = new Date();
  const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const index = diffDays % totalQuestions;

  const category = Math.floor(index / 10) + 1;
  const questionNum = (index % 10) + 1;

  const categoryDir = path.join(process.cwd(), "public", "questions", `${category}`);
  const filename = findQuestionFile(categoryDir, questionNum);

  const content = fs.readFileSync(filename, "utf-8").trim();
  const [subject, ...bodyLines] = content.split("\n");

  return {
    subject: subject.trim(),
    body: bodyLines.join("\n").trim(),
  };
}

function findQuestionFile(categoryDir, questionNum) {
  const files = fs.readdirSync(categoryDir);
  const targetPrefix = `${questionNum.toString().padStart(2, "0")}-`;
  const matched = files.find((f) => f.startsWith(targetPrefix));
  if (!matched) throw new Error(`질문 파일을 찾을 수 없습니다: ${categoryDir}/${targetPrefix}`);
  return path.join(categoryDir, matched);
}
