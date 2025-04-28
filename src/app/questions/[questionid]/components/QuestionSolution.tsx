"use client";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface QuestionSolutionProps {
  solution: string;
}
export default function QuestionSolution({ solution }: QuestionSolutionProps) {
  const [solutionText, setSolutionText] = useState("");

  useEffect(() => {
    if (!solution) return;

    const fetchSolution = async () => {
      try {
        const response = await fetch(solution);
        if (!response.ok) {
          throw new Error("모범답안 불러오기 실패");
        }
        const text = await response.text();
        setSolutionText(text);
      } catch (error) {
        console.error("모범답안 로딩 에러:", error);
      }
    };

    fetchSolution();
  }, [solution]);
  return (
    <div className="prose box-border p-[24px] h-[500px] border border-[var(--blue-03)] radius mt-6 w-full overflow-y-auto whitespace-pre-wrap">
      <ReactMarkdown>{solutionText}</ReactMarkdown>
    </div>
  );
}
