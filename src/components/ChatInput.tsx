import { useState, useRef } from "react";

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
}

const ChatInput = ({ onSend, disabled }: Props) => {
  const [inputText, setInputText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSend(inputText);
    setInputText("");
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="prompt-area d-flex align-items-center justify-content-center">
      <input
        type="text"
        id="prompt"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="form-control flex-grow-1"
        placeholder="Message...."
        autoComplete="off"
        disabled={disabled}
      />
      <button
        type="button"
        id="image"
        className="btn icon-btn"
        onClick={handleImageClick}
        disabled={disabled}
      >
        <img src="/image.png" alt="Attach image" />
      </button>
      <input type="file" id="fileInput" ref={fileInputRef} accept="image/*" hidden />
      <button type="submit" id="submit" className="btn icon-btn" disabled={disabled}>
        <img src="/upload-02-stroke-rounded.png" alt="Send" />
      </button>
    </form>
  );
};

export default ChatInput;