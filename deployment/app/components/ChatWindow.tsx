"use client";
import { useEffect, useRef, useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { getSimpleBotReply } from "../lib/simpleBot";

type Msg = { id: string; text: string; sender: "user" | "assistant" };

// const CONVERSATION_PAIRS_LIMIT = 5;
// const MAX_MSG_COUNT = ((CONVERSATION_PAIRS_LIMIT * 2) - 1) || 1;


export default function ChatWindow() {
  const [messages, setMessages] = useState<Msg[]>([
    // {
    //   id: "ai-1",
    //   text: "สวัสดี! ผมคือ MedGemma. มีอะไรให้ช่วยไหมครับ?",
    //   sender: "assistant",
    // },
  ]);
  const listRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    // auto-scroll
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);


  function sendMessage(text: string) {
    const userMsg: Msg = { id: `u-${Date.now()}`, text: text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);


    const botReply = getSimpleBotReply(text);

    const botMsg: Msg = { id: `ai-${Date.now()}`, text: botReply, sender: "assistant" };
    setMessages((prev) => [...prev, botMsg]);
  }


  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden shadow-lg bg-white">
      <div
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
        ref={listRef}
      >
        <MessageList messages={messages} />
      </div>
      <ChatInput onSend={sendMessage} />
    </div>
  );
}