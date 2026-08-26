import axios from "axios";
import type {
  SendMessagePayload,
  SendMessageResponse,
  Conversation,
  ChatMessageType,
} from "../Types/chat.type";

const API_URL = import.meta.env.VITE_API_URL;

export const SendMessageToBot = async (
  Payload: SendMessagePayload,
): Promise<SendMessageResponse> => {
  try {
    const { data } = await axios.post<SendMessageResponse>(
      `${API_URL}/api/chat`,
      Payload,
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
};

export const fetchConversations = async (
  userId: string,
): Promise<Conversation[]> => {
  try {
    const { data } = await axios.get<{ conversations: Conversation[] }>(
      `${API_URL}/api/chat/conversations/${userId}`,
    );
    return data.conversations;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
};

export const fetchChatHistory = async (
  userId: string,
  conversationId?: string,
): Promise<ChatMessageType[]> => {
  try {
    const { data } = await axios.get<{ messages: any[] }>(
      `${API_URL}/api/chat/history/${userId}`,
      {
        params: conversationId ? { conversationId } : {},
      },
    );
    return data.messages.map((msg) => ({
      id: msg._id,
      conversationId: msg.conversationId,
      role: msg.role,
      content: msg.content,
      timestamp: new Date(msg.createdAt),
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
};

export const deleteConversation = async (
  userId: string,
  conversationId: string,
): Promise<void> => {
  try {
    await axios.delete(
      `${API_URL}/api/chat/conversations/${userId}/${conversationId}`,
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || "Something went wrong");
    }
    throw new Error("Something went wrong");
  }
};
