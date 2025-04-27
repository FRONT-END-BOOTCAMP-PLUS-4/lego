import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";

export default function GithubLoginNotice() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      <div className="flex flex-col items-center">
        <MailIcon size={64} className="mb-3" />
        <h3 className="txt-2xl-b">이메일을 공개해주세요!</h3>
        <p>클릭 시 GitHub 프로필 설정으로 이동합니다.</p>
        <p className="text-[var(--gray-02)]">
          &#40;Public Profile &#45;&gt; Public email 설정&#41;
        </p>
      </div>

      <Button
        onClick={() => {
          window.open("https://github.com/settings/profile", "_blank");
        }}
      >
        이동하기
      </Button>
    </div>
  );
}
