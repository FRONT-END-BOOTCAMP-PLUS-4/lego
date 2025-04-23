"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { TextArea } from "@/components/ui/textArea";
import { toast } from "sonner";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  email: string;
  username: string;
  avatarUrl: string;
}

export default function CommentSection() {
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const questionId = Number(pathParts[2]);
  const answerEmail = decodeURIComponent(pathParts[4]);

  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newContent, setNewContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const itemsPerPage = 10;

  const fetchComments = async () => {
    const res = await fetch(`/api/comments?questionId=${questionId}&answerEmail=${answerEmail}`);
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    if (questionId && answerEmail) {
      fetchComments();
    }

    if (typeof window !== "undefined") {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        try {
          const parsed = JSON.parse(authStorage);
          const user = parsed?.state?.user;
          const email = user?.email;
          const nickname = user?.nickname;

          if (email) {
            setCurrentUserEmail(email);
            setIsLoggedIn(true);
          }
          if (nickname) {
            setCurrentUserName(nickname);
          }
        } catch (error) {
          console.error("Failed to parse auth-storage:", error);
        }
      }
    }
  }, [questionId, answerEmail]);

  const getUserInfo = () => {
    if (typeof window === "undefined") return null;

    const authStorage = localStorage.getItem("auth-storage");
    if (!authStorage) return null;

    try {
      const parsed = JSON.parse(authStorage);
      return parsed?.state?.user || null;
    } catch (error) {
      console.error("Error parsing user info:", error);
      return null;
    }
  };

  const handleCreate = async () => {
    if (!newContent.trim()) return;

    const user = getUserInfo();
    if (!user) return;

    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionId,
        answerEmail,
        content: newContent,
        email: user.email,
        username: user.nickname,
        avatarUrl: user.avatarUrl,
      }),
    });

    setNewContent("");
    await fetchComments();
  };

  const handleEdit = async (id: number) => {
    await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editingContent }),
    });

    setEditingId(null);
    setEditingContent("");
    await fetchComments();
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/comments/${id}`, { method: "DELETE" });
    toast.success("댓글이 삭제되었습니다.", {
      position: "bottom-right",
    });
    await fetchComments();
  };

  const currentComments = comments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleMovePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="mt-[40px] mb-[16px]">
        <label className="txt-sm-b" htmlFor="comment">
          <span className="text-[var(--gray-02)]">댓글 수 </span>
          <span className="text-black">{comments.length}</span>
        </label>
        {isLoggedIn && (
          <>
            <div className="mb-[10px]" />
            <div className="flex gap-2">
              <TextArea
                placeholder="Type your message here"
                value={newContent}
                label={currentUserName}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <Button
                className="w-[80px] h-[120px]"
                variant="outline"
                onClick={handleCreate}
              >
                등록
              </Button>
            </div>
          </>
        )}
      </div>

      <div className="mb-[58px]" />

      <div className="mt-[30px] space-y-8">
        {currentComments.map((comment) => (
          <div key={comment.id} className="border-b pb-4 flex gap-4">
            <div className="relative w-[36px] h-[36px] shrink-0">
              <Image
                src={comment.avatarUrl}
                alt="avatar"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              {editingId !== comment.id && (
                <div className="text-sm font-bold mb-1">{comment.username}</div>
              )}
              {editingId === comment.id ? (
                <div className="flex gap-2 w-full">
                  <TextArea
                    placeholder="Type your message here"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    label={currentUserName}
                  />
                  <div className="flex flex-col gap-2">
                    <Button size="sm" onClick={() => handleEdit(comment.id)}>
                      저장
                    </Button>
                    <Button
                      size="sm"
                      variant="gray"
                      onClick={() => setEditingId(null)}
                    >
                      취소
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-base mb-1">{comment.content}</div>
                  <div className="text-xs text-[var(--gray-02)]">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </>
              )}
            </div>
            {editingId !== comment.id && comment.email === currentUserEmail && (
              <div className="flex flex-col items-end gap-2">
                <Button
                  variant="gray"
                  size="sm"
                  onClick={() => {
                    setEditingId(comment.id);
                    setEditingContent(comment.content);
                  }}
                >
                  수정
                </Button>
                <Button
                  variant="gray"
                  size="sm"
                  onClick={() => handleDelete(comment.id)}
                >
                  삭제
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-[40px]">
        <Pagination
          totalCount={comments.length}
          itemsPerPage={itemsPerPage}
          pageNumber={currentPage}
          currentPageBlock={currentPage}
          handleMovePageBlock={() => {}}
          handleMovePage={handleMovePage}
        />
      </div>
    </>
  );
}