import FormattedText from "./FormattedText";

type Props = {
  message: { id: string; text: string; sender: 'user' | 'assistant' };
};

export default function MessageItem({ message }: Props) {
  const isUser = message.sender === 'user';

  const rowClass = isUser ? 'flex justify-end' : 'flex justify-start';
  const bubbleClass = isUser
    ? 'max-w-[72%] px-3 py-2 rounded-xl bg-[#0b5fff] text-white break-words whitespace-pre-wrap'
    : 'max-w-[72%] px-3 py-2 rounded-xl bg-[#eef2ff] text-[#06213a] break-words whitespace-pre-wrap';

  return (
    <div className={rowClass}>
      <div className={bubbleClass}>
        <FormattedText text={message.text} />
      </div>
    </div>
  );
}
