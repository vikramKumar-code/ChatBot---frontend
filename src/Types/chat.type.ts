export type MessageRole = "user" | "model";

export interface ChatMessageType {
  id: string;
  conversationId?: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export interface SendMessagePayload {
  message: string;
  userId: string;
  conversationId?: string;
}

export interface SendMessageResponse {
  reply: string;
  conversationId: string;
}

export interface ErrorResponse {
  error: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string | Date;
}
