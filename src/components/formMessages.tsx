import SendIcon from "./sendIcon";

interface FormMessagesProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  textMessage: string;
  setTextMessage: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

const FormMessages = ({
  handleSubmit,
  textMessage,
  setTextMessage,
  isLoading,
}: FormMessagesProps) => {
  return (
    <form
      className="flex min-h-16 w-full items-center gap-2 bg-[#202c33] py-1 pr-4 sm:pl-4"
      onSubmit={handleSubmit}
    >
      <input
        className="mx-2 my-1 flex-1 rounded-lg bg-[#2a3942] px-3 py-2 placeholder:px-1 focus:outline-none"
        name="message"
        placeholder="Escribe un mensaje"
        type="text"
        value={textMessage}
        onChange={(event) => setTextMessage(event.target.value)}
      />
      <button disabled={textMessage === "" || isLoading} type="submit">
        <SendIcon
          style={`fill-[#7c8b95] ${textMessage === "" || isLoading ? "opacity-20" : "opacity-100"}`}
        />
      </button>
    </form>
  );
};

export default FormMessages;
