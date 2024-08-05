interface SelectVoicesProps {
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  voices: SpeechSynthesisVoice[];
}

const SelectVoices = ({setLanguage, voices}: SelectVoicesProps) => {
  return (
    <label className="flex flex-col gap-2 bg-[#202c33] px-2 py-1 sm:flex-row sm:items-center sm:px-6">
      Entrevistador:
      <select
        className="my-1 rounded-lg bg-[#2a3942] px-3 py-2 sm:mx-2"
        name="language"
        onChange={(event) => setLanguage(event.target.value)}
      >
        {voices.map((voice, index) => (
          <option key={index} value={voice.name}>
            {voice.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectVoices;
