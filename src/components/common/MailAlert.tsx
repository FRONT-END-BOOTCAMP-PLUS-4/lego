"use client";

import { useHandleMail } from "@/utils/handleMail";
import { Mail } from "lucide-react";

export default function MailAlertButton() {
  const handleMail = useHandleMail();

  return (
    <button
      onClick={handleMail}
      className="flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--blue-03)] cursor-pointer hover:-translate-y-1 transition-transform duration-300"
    >
      <Mail fill="white" />
      <span>메일 받기</span>
    </button>
  );
}
