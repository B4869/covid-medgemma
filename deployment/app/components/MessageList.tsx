import MessageItem from './MessageItem';

type Msg = { id: string; text: string; sender: 'user' | 'assistant' };
type Props = { messages: Msg[] };

export default function MessageList({ messages }: Props) {
  return (
    <div className="flex flex-col gap-8 py-2">
      {messages.map((m) => (
        <MessageItem key={m.id} message={m} />
      ))}
    </div>
  );
}