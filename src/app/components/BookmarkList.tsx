import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "lucide-react";
import { formatNumber } from "@/utils/handleFormat";

export default function BookmarkList() {
  return (
    <section className="mb-[100px]" data-aos="fade-up">
      <h3 className="txt-3xl-b pb-[var(--space-36)]">많이 스크랩된 콘텐츠</h3>
      <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-4">
        {[...Array(4)].map((_, i) => (
          <Link href={`/questions/${i + 1}`} key={i}>
            <Card variant="default" className="flex flex-col gap-[var(--space-40)]">
              <p className="txt-2xl-b">HTTP 메소드에 대한 설명</p>
              <div className="flex justify-between">
                <Badge variant="outline">JavaScript</Badge>
                <div className="flex gap-2">
                  <Bookmark className="fill-[var(--black)] stroke-none" />
                  <p>{formatNumber(1000)}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
