import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function PopularAnswers() {
  return (
    <section className="mb-[150px]" data-aos="fade-left">
      <h3 className="txt-3xl-b pb-[var(--space-36)]">많이 좋아요 받은 답변</h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Link href={`/questions/${i + 1}/answer/${i + 1}`} key={i}>
            <Card
              variant="none"
              className="flex flex-col gap-[var(--space-40)] p-[var(--space-36)]"
            >
              <p className="txt-2xl-b line-clamp-3">
                컴포넌트를 개발하다보면 무심코 하나의 컴포넌트에서 많은 역할을 담당하고 있는 경우가
                있습니다. 하나의 클래스는 오직 하나의 이유로만 변경해야 한다는 어쩌구저쩌구 글씨
                짤라보자
              </p>
              <div className="flex justify-between">
                <p>리액트의 어쩌구 저쩌구에 대해 설명해주세요</p>
                <p>사용자</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
