export default function QuestionSolution({ solution }: string) {
  return (
    <textarea
      className="box-border p-[24px] h-[500px] border border-[var(--blue-03)] radius mt-6 w-full resize-none focus:ring-1 focus:ring-[var(--blue-03)] focus:outline-none"
      readOnly
      value={"답안내용"}
    ></textarea>
  );
}
