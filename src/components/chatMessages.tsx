import {type Message} from "../types";

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({messages}: ChatMessagesProps) => {
  return (
    <section className="flex max-h-[70dvh] max-w-[100dvw] flex-col-reverse overflow-auto bg-[#161f25] p-4 sm:max-h-[73dvh]">
      <ul className="grid gap-4">
        {messages?.map((message, index) => (
          <li
            key={index}
            className={`max-w-[70%] rounded-lg p-2 ${message.role === "user" ? "justify-self-end break-words rounded-tr-none bg-[#045b4b]" : "justify-self-start rounded-tl-none bg-[#202c33]"}`}
          >
            {message.parts[0].text}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ChatMessages;
