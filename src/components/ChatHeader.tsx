interface Props {
  onToggleSidebar: () => void;
}

const ChatHeader = ({ onToggleSidebar }: Props) => {
  return (
    <header className="chat-header-bar">
      <button
        className="sidebar-toggle-btn"
        onClick={onToggleSidebar}
        aria-label="Open sidebar"
      >
        &#9776;
      </button>
      <div className="chat-header-info">
        <h1>Mitra AI</h1>
        <span className="active-status">Created By Vikram</span>
      </div>
    </header>
  );
};

export default ChatHeader;
