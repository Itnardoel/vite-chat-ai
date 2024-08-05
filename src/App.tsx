import {useEffect, useState} from "react";

import ChatMessages from "./components/chatMessages";
import FormMessages from "./components/formMessages";
import SelectVoices from "./components/selectVoices";
import {type Message} from "./types";

const synth = window.speechSynthesis;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [language, setLanguage] = useState("");
  const [buffer, setBuffer] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      parts: [
        {
          text: "¡Hola! 👋 Bienvenido/a a EntrevistAIdor. Para una mejor experiencia, la aplicación siempre escuchará tu voz si lo permitís, pero también podés escribir tu mensaje. No olvides elegir a tu entrevistador en la parte inferior de la pantalla para poder escucharlo 👇. ¡Comencemos!",
        },
      ],
    },
  ]);
  const [textMessage, setTextMessage] = useState("");

  const recognition = new webkitSpeechRecognition();

  recognition.continuous = true;
  recognition.lang = "es-AR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.start();

  useEffect(() => {
    setVoices(synth.getVoices());
  }, []);

  function saveMessages(role: "user" | "model", message: string) {
    setMessages((prevMessages) => {
      const newMessage = {
        role: role,
        parts: [{text: message}],
      } as Message;

      return [...prevMessages, newMessage];
    });
  }

  async function getAnswer(message: string) {
    const answer = await fetch("/gemini", {
      method: "POST",
      body: JSON.stringify({text: message}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json() as Promise<{message: string}>)
      .then((data) => data.message);

    return answer;
  }

  recognition.onspeechstart = () => {
    synth.cancel();
  };

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");

    setBuffer(transcript);
    recognition.stop();
  };

  recognition.onspeechend = async () => {
    saveMessages("user", buffer);

    const answer = await getAnswer(buffer);

    saveMessages("model", answer);

    const utterance = new SpeechSynthesisUtterance(answer);

    utterance.voice = voices.find((voice) => voice.name === language)!;
    synth.speak(utterance);
  };

  recognition.onend = () => {
    recognition.start();
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    synth.cancel();
    setTextMessage("");

    setIsLoading(true);

    saveMessages("user", textMessage);

    const answer = await getAnswer(textMessage);

    saveMessages("model", answer);

    setIsLoading(false);

    const utterance = new SpeechSynthesisUtterance(answer);

    utterance.voice = voices.find((voice) => voice.name === language)!;
    synth.speak(utterance);
  }

  return (
    <main className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto,auto] px-2 sm:px-4">
      <header className="text-xl font-bold leading-[4rem]">EntrevistAIdor</header>
      <ChatMessages messages={messages} />
      <section>
        <FormMessages
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          setTextMessage={setTextMessage}
          textMessage={textMessage}
        />
        <SelectVoices setLanguage={setLanguage} voices={voices} />
      </section>
      <footer className="text-center leading-[4rem] opacity-70">
        © {new Date().getFullYear()} EntrevistAIdor
      </footer>
    </main>
  );
}

export default App;
