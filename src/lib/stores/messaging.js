import { writable } from 'svelte/store';
import { fetchApi } from '../utils/api';

export const messages = writable([]);
export const unreadCount = writable(0);
export const conversations = writable([]);

export async function loadMessages() {
  try {
    // First check if the user is staff
    const userResponse = await fetchApi('users/me/');
    const isStaff = userResponse.is_staff;
    
    if (isStaff) {
      // For admins, this endpoint doesn't make sense without a user ID
      // They should use loadUserChat instead
      console.warn("Admin users should use loadUserChat with a specific user ID");
      messages.set([]);
      return [];
    } else {
      // For regular users, load their conversation with admins
      const data = await fetchApi('messages/admin_chat/');
      messages.set(data);
      return data;
    }
  } catch (e) {
    console.error('Error loading messages:', e);
    throw e;
  }
}

export async function loadConversations() {
  try {
    const data = await fetchApi('messages/my_conversations/');
    
    if (Array.isArray(data)) {
      conversations.set(data);
      
      // Calculate total unread count for admins
      const totalUnread = data.reduce((total, conv) => total + conv.unread_count, 0);
      unreadCount.set(totalUnread);
    } else {
      // For regular users
      conversations.set([]);
      unreadCount.set(data.unread_count || 0);
    }
    
    return data;
  } catch (e) {
    console.error('Error loading conversations:', e);
    throw e;
  }
}

export async function sendMessage(content, receiverId = null) {
  try {
    // Create a proper payload based on user type
    let payload = { content: content.trim() };
    
    // Only add receiver if it's specifically provided (for admin->user messages)
    if (receiverId) {
      payload.receiver = parseInt(receiverId);
      console.log(`Sending message to user ID ${receiverId}`);
    } else {
      console.log("Sending message to admin (null receiver)");
    }
    
    console.log("Message payload:", payload);
    
    // Send the message using the API
    const response = await fetchApi('messages/', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    
    console.log("Message sent response:", response);
    
    // If the message was sent by an admin to a user, reload that user's chat
    if (receiverId) {
      await loadUserChat(receiverId);
    } else {
      // Otherwise reload the user's admin chat
      await loadMessages();
    }
    
    return response;
  } catch (e) {
    console.error('Error sending message:', e);
    throw e;
  }
}

export async function loadUserChat(userId) {
  try {
    const data = await fetchApi(`messages/user/${userId}/`);
    messages.set(data);
    return data;
  } catch (e) {
    console.error('Error loading user chat:', e);
    throw e;
  }
}