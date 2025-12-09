"use client";
import { useEffect, useRef, useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { getBotReply } from "../lib/getBotReply";

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
  const [isTyping, setIsTyping] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // auto-scroll
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  async function sendMessage(text: string) {
    // delete last two messages if fail
    if (isFail) {
      setMessages((prev) => prev.slice(0, -2));
      setIsFail(false);
    }


    const userMsg: Msg = { id: `u-${Date.now()}`, text: text, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);


    try {
      const allMessages = [
        ...(isFail ? messages.slice(0, -2) : messages),
        userMsg,
      ];
      // const messageHistory = allMessages.slice(-MAX_MSG_COUNT);


      const botReply = await getBotReply(allMessages as any);
      const botMsg: Msg = {
        id: `ai-${Date.now()}`,
        text: (botReply as any).content,
        sender: "assistant",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      if ((botReply as any).status !== "successed") setIsFail(true);


    } catch (error) {
      const errorMsg: Msg = {
        id: `ai-${Date.now()}`,
        text: (error as Error)?.message,
        sender: "assistant",
      };
      setMessages((prev) => [...prev, errorMsg]);
      setIsTyping(false);
      setIsFail(true);
    }
  }

  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden shadow-lg bg-white">
      <div
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3"
        ref={listRef}
      >
        <MessageList messages={messages} />
        {isTyping && (
          <div className="flex justify-start">
            <div className="italic opacity-80 max-w-[72%] px-3 py-2 rounded-xl bg-[#eef2ff] text-[#06213a]">
              กำลังพิมพ์...
            </div>
          </div>
        )}
      </div>
      <ChatInput onSend={sendMessage} isTyping={isTyping} />
    </div>
  );
}