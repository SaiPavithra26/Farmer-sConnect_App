import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChatStackParamList } from '@/src/types/navigation';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Header from '@/src/components/common/Header/Header';
import Input from '@/src/components/common/Input/Input';
import { Send, Phone, Video, MoveHorizontal as MoreHorizontal, Camera, Paperclip } from 'lucide-react-native';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  type: 'text' | 'image' | 'file';
  imageUrl?: string;
  isMe: boolean;
}

type NavigationProp = StackNavigationProp<ChatStackParamList, 'ChatDetail'>;

export default function ChatScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { chatId } = route.params as { chatId: string };
  const flatListRef = useRef<FlatList>(null);
  
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I saw your organic tomatoes. Are they still available?',
      timestamp: '2025-01-20T10:30:00',
      senderId: 'customer1',
      senderName: 'Priya Sharma',
      type: 'text',
      isMe: false,
    },
    {
      id: '2',
      text: 'Yes, they are! Fresh harvest from yesterday. How much do you need?',
      timestamp: '2025-01-20T10:32:00',
      senderId: 'farmer1',
      senderName: 'John Farmer',
      type: 'text',
      isMe: true,
    },
    {
      id: '3',
      text: 'I need about 5 kg. Can you deliver to Koramangala?',
      timestamp: '2025-01-20T10:33:00',
      senderId: 'customer1',
      senderName: 'Priya Sharma',
      type: 'text',
      isMe: false,
    },
    {
      id: '4',
      text: 'Absolutely! Delivery is available. I can deliver today evening between 6-8 PM.',
      timestamp: '2025-01-20T10:35:00',
      senderId: 'farmer1',
      senderName: 'John Farmer',
      type: 'text',
      isMe: true,
    },
  ]);

  const [otherUser] = useState({
    name: 'Priya Sharma',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    role: 'Customer',
    isOnline: true,
  });

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      timestamp: new Date().toISOString(),
      senderId: 'farmer1',
      senderName: 'John Farmer',
      type: 'text',
      isMe: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.isMe ? styles.myMessageContainer : styles.otherMessageContainer
    ]}>
      {!item.isMe && (
        <Image source={{ uri: otherUser.avatar }} style={styles.messageAvatar} />
      )}
      
      <View style={[
        styles.messageBubble,
        item.isMe ? styles.myMessageBubble : styles.otherMessageBubble
      ]}>
        {item.type === 'image' && item.imageUrl && (
          <Image source={{ uri: item.imageUrl }} style={styles.messageImage} />
        )}
        
        <Text style={[
          styles.messageText,
          item.isMe ? styles.myMessageText : styles.otherMessageText
        ]}>
          {item.text}
        </Text>
        
        <Text style={[
          styles.messageTime,
          item.isMe ? styles.myMessageTime : styles.otherMessageTime
        ]}>
          {new Date(item.timestamp).toLocaleTimeString('en-IN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header 
        title={otherUser.name}
        subtitle={`${otherUser.role} • ${otherUser.isOnline ? 'Online' : 'Offline'}`}
        showBackButton 
        onBackPress={() => navigation.goBack()}
      />

      {/* Chat Header Actions */}
      <View style={styles.chatActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Phone size={20} color={colors.primary[600]} />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Video size={20} color={colors.primary[600]} />
          <Text style={styles.actionText}>Video</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <MoreHorizontal size={20} color={colors.gray[500]} />
        </TouchableOpacity>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TouchableOpacity style={styles.attachButton}>
            <Camera size={20} color={colors.gray[500]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={20} color={colors.gray[500]} />
          </TouchableOpacity>
          
          <View style={styles.textInputContainer}>
            <Input
              label=""
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message..."
              multiline
            />
          </View>
          
          <TouchableOpacity 
            style={[styles.sendButton, message.trim() && styles.sendButtonActive]}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <Send size={20} color={message.trim() ? colors.white : colors.gray[400]} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  chatActions: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    marginRight: spacing.sm,
  },
  actionText: {
    fontFamily: fonts.primary.medium,
    fontSize: fonts.sizes.sm,
    color: colors.primary[600],
    marginLeft: spacing.xs,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    alignItems: 'flex-end',
  },
  myMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: spacing.sm,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: spacing.md,
    borderRadius: 16,
  },
  myMessageBubble: {
    backgroundColor: colors.primary[600],
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: spacing.xs,
  },
  messageText: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.md,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  myMessageText: {
    color: colors.white,
  },
  otherMessageText: {
    color: colors.gray[800],
  },
  messageTime: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
  },
  myMessageTime: {
    color: colors.primary[100],
    textAlign: 'right',
  },
  otherMessageTime: {
    color: colors.gray[500],
  },
  inputContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  attachButton: {
    padding: spacing.sm,
    backgroundColor: colors.gray[100],
    borderRadius: 20,
  },
  textInputContainer: {
    flex: 1,
  },
  textInput: {
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: colors.gray[200],
    borderRadius: 20,
    padding: spacing.sm,
  },
  sendButtonActive: {
    backgroundColor: colors.primary[600],
  },
});