import type { ChatMessageType } from "../Types/chat.type";

interface Props {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: Props) => {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="user-chat-box">
        <div className="user-chat-area">{message.content}</div>
        <img
          src="https://static.vecteezy.com/system/resources/previews/018/742/015/original/minimal-profile-account-symbol-user-interface-theme-3d-icon-rendering-illustration-isolated-in-transparent-background-png.png"
          alt="User"
          id="userImage"
        />
      </div>
    );
  }

  return (
    <div className="ai-chat-box">
      <img src="/ai-bot.svg" alt="AI chatbot" id="aiImage" />
      <div className="ai-chat-area">{message.content}</div>
    </div>
  );
};

export default ChatMessage;
