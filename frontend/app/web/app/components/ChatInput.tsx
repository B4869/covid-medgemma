"use client";
import { useState } from "react";
import { SendHorizonal } from "lucide-react";

type Props = {
  onSend: (text: string) => void;
  isTyping: boolean;
};

export default function ChatInput({ onSend, isTyping }: Props) {
  const [value, setValue] = useState("");
  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue("");
  }

  return (
    <form
      className="flex gap-2 p-3 border-t border-gray-200 bg-white"
      onSubmit={handleSubmit}
    >
      <input
        aria-label="Message"
        className="flex-1 p-2.5 rounded-md border border-gray-300"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={isTyping ? "รอสักครู่..." : "ลองถามคำถามดูสิ"}
        disabled={isTyping}
      />
      <button
        type="submit"
        className={isTyping ? "bg-gray-300 text-white px-4 py-2 rounded-md" : "bg-[#0b5fff] text-white px-4 py-2 rounded-md"}
      >
        <SendHorizonal className="w-5 h-5" />
      </button>
    </form>
  );
}