import type { Conversation } from "../Types/chat.type";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  conversations: Conversation[];
  currentConversationId: string | null;
  conversationsLoading: boolean;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
}

const Sidebar = ({
  isOpen,
  onClose,
  onNewChat,
  conversations,
  currentConversationId,
  conversationsLoading,
  onSelectConversation,
  onDeleteConversation,
}: Props) => {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src="/ai-bot.svg" alt="Logo" className="logo-img" />
          <span>Mitra AI</span>
        </div>
        <button
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          &times;
        </button>
      </div>

      <button className="new-chat-btn" onClick={onNewChat}>
        <span className="btn-icon">&#43;</span> New Chat
      </button>

      <div className="conversations-list">
        <div className="section-title">Recent Chats</div>
        {conversationsLoading ? (
          <div className="sidebar-loading">Loading conversations...</div>
        ) : conversations.length === 0 ? (
          <div className="sidebar-empty">No conversations yet</div>
        ) : (
          conversations.map((conv) => {
            const isActive = conv.id === currentConversationId;
            return (
              <div
                key={conv.id}
                className={`conversation-item ${isActive ? "active" : ""}`}
                onClick={() => onSelectConversation(conv.id)}
              >
                <span className="conversation-icon">&#128172;</span>
                <span className="conversation-title" title={conv.title}>
                  {conv.title}
                </span>
                <button
                  className="delete-conv-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Are you sure you want to delete this chat?")) {
                      onDeleteConversation(conv.id);
                    }
                  }}
                  aria-label="Delete conversation"
                >
                  &#128465;
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">&#128100;</div>
          <div className="user-info">
            <span className="user-name">Test User</span>
            <span className="user-status">Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
