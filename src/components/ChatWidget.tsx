// import { useState } from "react";
// import ChatMessage from "./ChatMessage";
// import ChatInput from "./ChatInput";
// import { useChat } from "../hooks/UseChat";
// import "./ChatWidget.css";

// const ChatWidget = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const { messages, loading, error, sendMessage } = useChat();

//   return (
//     <div className="chat-widget">
//       {isOpen && (
//         <div className="chat-window">
//           <div className="chat-header">
//             <span>Shopster Assistant</span>
//             <button onClick={() => setIsOpen(false)}>×</button>
//           </div>

//           <div className="chat-body">
//             {messages.map((msg) => (
//               <ChatMessage key={msg.id} message={msg} />
//             ))}
//             {loading && <div className="chat-loading">Typing...</div>}
//             {error && <div className="chat-error">{error}</div>}
//           </div>

//           <ChatInput onSend={sendMessage} disabled={loading} />
//         </div>
//       )}

//       <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
//         💬
//       </button>
//     </div>
//   );
// };

// export default ChatWidget;