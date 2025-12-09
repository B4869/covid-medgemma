import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#f6f8fb]">
      <Header />
      <div className="flex-1 flex items-center justify-center w-full px-4">
        <div className="w-full max-w-[1000px] aspect-[25/16] min-h-[480px]">
          <ChatWindow />
        </div>
      </div>
    </main>
  );
}