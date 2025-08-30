import { apiClient } from './apiClient';

interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  type: 'text' | 'image' | 'file';
  timestamp: string;
  isRead: boolean;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
}

interface Chat {
  id: string;
  participants: string[];
  lastMessage?: Message;
  lastMessageAt?: string;
  unreadCount: number;
  isActive: boolean;
}

export class ChatAPI {
  static async getChats(userId: string) {
    return apiClient.get<Chat[]>(`/chats?userId=${userId}`);
  }

  static async getChat(chatId: string) {
    return apiClient.get<Chat>(`/chats/${chatId}`);
  }

  static async getMessages(chatId: string, page: number = 1, limit: number = 50) {
    return apiClient.get<Message[]>(`/chats/${chatId}/messages?page=${page}&limit=${limit}`);
  }

  static async sendMessage(chatId: string, messageData: {
    text: string;
    type?: 'text' | 'image' | 'file';
    imageUrl?: string;
    fileUrl?: string;
    fileName?: string;
  }) {
    return apiClient.post<Message>(`/chats/${chatId}/messages`, messageData);
  }

  static async createChat(participantIds: string[]) {
    return apiClient.post<Chat>('/chats', { participants: participantIds });
  }

  static async markMessagesAsRead(chatId: string, messageIds: string[]) {
    return apiClient.put(`/chats/${chatId}/read`, { messageIds });
  }

  static async deleteMessage(chatId: string, messageId: string) {
    return apiClient.delete(`/chats/${chatId}/messages/${messageId}`);
  }

  static async searchMessages(chatId: string, query: string) {
    return apiClient.get<Message[]>(`/chats/${chatId}/search?q=${encodeURIComponent(query)}`);
  }

  static async uploadChatImage(file: any) {
    // This would handle image upload for chat
    return apiClient.post<{ url: string }>('/chats/upload-image', file);
  }

  static async uploadChatFile(file: any) {
    // This would handle file upload for chat
    return apiClient.post<{ url: string; fileName: string }>('/chats/upload-file', file);
  }

  static async getChatBetweenUsers(userId1: string, userId2: string) {
    return apiClient.get<Chat>(`/chats/between?user1=${userId1}&user2=${userId2}`);
  }

  static async blockUser(chatId: string, userId: string) {
    return apiClient.put(`/chats/${chatId}/block`, { userId });
  }

  static async unblockUser(chatId: string, userId: string) {
    return apiClient.put(`/chats/${chatId}/unblock`, { userId });
  }

  static async reportChat(chatId: string, reason: string) {
    return apiClient.post(`/chats/${chatId}/report`, { reason });
  }

  static async muteChat(chatId: string, duration?: number) {
    return apiClient.put(`/chats/${chatId}/mute`, { duration });
  }

  static async unmuteChat(chatId: string) {
    return apiClient.put(`/chats/${chatId}/unmute`);
  }

  static async archiveChat(chatId: string) {
    return apiClient.put(`/chats/${chatId}/archive`);
  }

  static async unarchiveChat(chatId: string) {
    return apiClient.put(`/chats/${chatId}/unarchive`);
  }

  static async deleteChat(chatId: string) {
    return apiClient.delete(`/chats/${chatId}`);
  }

  static async getUnreadCount(userId: string) {
    return apiClient.get<{ count: number }>(`/chats/unread-count?userId=${userId}`);
  }
}

export default ChatAPI;