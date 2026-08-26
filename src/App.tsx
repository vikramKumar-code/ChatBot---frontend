import { useRef, useEffect, useState } from "react";
import { useChat } from "./hooks/UseChat";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import WelcomeScreen from "./components/WelcomeScreen";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import "./App.css";

function App() {
  const {
    conversations,
    currentConversationId,
    messages,
    loading,
    conversationsLoading,
    error,
    sendMessage,
    selectConversation,
    startNewChat,
    deleteChat,
  } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleConversationClick = (id: string) => {
    selectConversation(id);
    setSidebarOpen(false); // Close sidebar on mobile
  };

  const handleNewChatClick = () => {
    startNewChat();
    setSidebarOpen(false); // Close sidebar on mobile
  };

  return (
    <div className="chat-app">
      {/* Sidebar backdrop for mobile view */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChatClick}
        conversations={conversations}
        currentConversationId={currentConversationId}
        conversationsLoading={conversationsLoading}
        onSelectConversation={handleConversationClick}
        onDeleteConversation={deleteChat}
      />

      {/* Main Chat Area */}
      <div className="main-content">
        <ChatHeader onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="chat-container">
          {/* Default Greeting / Welcome Screen when there are no messages */}
          {messages.length === 0 && <WelcomeScreen />}

          {/* Dynamic Messages */}
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {/* Loading state */}
          {loading && (
            <div className="ai-chat-box">
              <img src="/ai-bot.svg" alt="AI chatbot" id="aiImage" />
              <div className="ai-chat-area">
                <img src="/loading.svg" alt="loader" className="load" />
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="ai-chat-box">
              <img src="/ai-bot.svg" alt="AI chatbot" id="aiImage" />
              <div className="ai-chat-area chat-error">{error}</div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </main>

        <ChatInput onSend={sendMessage} disabled={loading} />
      </div>
    </div>
  );
}

export default App;