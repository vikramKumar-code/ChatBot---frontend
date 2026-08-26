import { useState, useEffect } from "react";
import type { ChatMessageType, Conversation } from "../Types/chat.type";
import {
  SendMessageToBot,
  fetchConversations,
  fetchChatHistory,
  deleteConversation,
} from "../services/Api";

const USER_ID = "test-User-1";

export const useChat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [conversationsLoading, setConversationsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load conversations on mount
  useEffect(() => {
    const initChats = async () => {
      setConversationsLoading(true);
      try {
        const chats = await fetchConversations(USER_ID);
        setConversations(chats);
        if (chats.length > 0) {
          // Select the latest conversation by default
          await selectConversation(chats[0].id);
        } else {
          startNewChat();
        }
      } catch (err) {
        console.error("Error loading initial conversations:", err);
        setError("Failed to load conversation list.");
      } finally {
        setConversationsLoading(false);
      }
    };

    initChats();
  }, []);

  const loadConversations = async () => {
    try {
      const chats = await fetchConversations(USER_ID);
      setConversations(chats);
      return chats;
    } catch (err) {
      console.error("Error loading conversations:", err);
    }
  };

  const selectConversation = async (conversationId: string) => {
    setLoading(true);
    setError(null);
    setCurrentConversationId(conversationId);
    try {
      const history = await fetchChatHistory(USER_ID, conversationId);
      setMessages(history);
    } catch (err) {
      console.error("Error loading chat history:", err);
      setError("Failed to load chat history.");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setCurrentConversationId(null);
    setMessages([]);
    setError(null);
  };

  const deleteChat = async (conversationId: string) => {
    try {
      await deleteConversation(USER_ID, conversationId);
      const updatedConversations = await fetchConversations(USER_ID);
      setConversations(updatedConversations);

      // If we deleted the current conversation
      if (currentConversationId === conversationId) {
        if (updatedConversations.length > 0) {
          await selectConversation(updatedConversations[0].id);
        } else {
          startNewChat();
        }
      }
    } catch (err) {
      console.error("Error deleting conversation:", err);
      setError("Failed to delete conversation.");
    }
  };

  const sendMessage = async (text: string): Promise<void> => {
    if (!text.trim()) return;

    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
      conversationId: currentConversationId || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    const isNewChat = !currentConversationId;

    try {
      const response = await SendMessageToBot({
        message: text,
        userId: USER_ID,
        conversationId: currentConversationId || undefined,
      });

      const botMessage: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "model",
        content: response.reply,
        timestamp: new Date(),
        conversationId: response.conversationId,
      };

      setMessages((prev) => [...prev, botMessage]);

      if (isNewChat) {
        setCurrentConversationId(response.conversationId);
      }

      await loadConversations();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};
