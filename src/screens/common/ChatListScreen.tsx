import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChatStackParamList } from '@/src/types/navigation';
import { colors } from '@/src/styles/colors';
import { fonts } from '@/src/styles/fonts';
import { spacing } from '@/src/styles/spacing';
import Card from '@/src/components/common/Card/Card';
import { MessageCircle, Search, Phone, Video } from 'lucide-react-native';

type NavigationProp = StackNavigationProp<ChatStackParamList, 'ChatList'>;

export default function ChatListScreen() {
  const navigation = useNavigation<NavigationProp>();
  
  const [conversations] = useState([
    {
      id: '1',
      name: 'John Farmer',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Your tomatoes are ready for harvest!',
      timestamp: '2 min ago',
      unreadCount: 2,
      isOnline: true,
      type: 'farmer',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Can you deliver by tomorrow?',
      timestamp: '1 hour ago',
      unreadCount: 0,
      isOnline: false,
      type: 'customer',
    },
    {
      id: '3',
      name: 'Maria Garcia',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Thank you for the fresh vegetables',
      timestamp: '3 hours ago',
      unreadCount: 0,
      isOnline: true,
      type: 'customer',
    },
  ]);

  const renderConversation = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => navigation.navigate('ChatDetail', { chatId: item.id, otherUserId: item.id })}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.isOnline && <View style={styles.onlineIndicator} />}
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        
        <Text style={[
          styles.lastMessage,
          item.unreadCount > 0 && styles.unreadMessage
        ]}>
          {item.lastMessage}
        </Text>
        
        <Text style={styles.userType}>
          {item.type === 'farmer' ? '🌾 Farmer' : '🛒 Customer'}
        </Text>
      </View>

      <View style={styles.conversationActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Phone size={18} color={colors.primary[600]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Video size={18} color={colors.primary[600]} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color={colors.primary[600]} />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <MessageCircle size={24} color={colors.primary[600]} />
          <Text style={styles.statNumber}>{conversations.length}</Text>
          <Text style={styles.statLabel}>Active Chats</Text>
        </Card>
        
        <Card style={styles.statCard}>
          <View style={styles.onlineIndicator} />
          <Text style={styles.statNumber}>
            {conversations.filter(c => c.isOnline).length}
          </Text>
          <Text style={styles.statLabel}>Online Now</Text>
        </Card>
      </View>

      {/* Conversations List */}
      {conversations.length > 0 ? (
        <FlatList
          data={conversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.conversationsList}
        />
      ) : (
        <View style={styles.emptyState}>
          <MessageCircle size={64} color={colors.gray[300]} />
          <Text style={styles.emptyTitle}>No Messages Yet</Text>
          <Text style={styles.emptySubtitle}>
            Start conversations with farmers or customers to see them here
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingTop: 50,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xxl,
    color: colors.gray[800],
  },
  searchButton: {
    padding: spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  statNumber: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xl,
    color: colors.gray[800],
    marginVertical: spacing.sm,
  },
  statLabel: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
  },
  conversationsList: {
    paddingHorizontal: spacing.lg,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.sm,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success[500],
    borderWidth: 2,
    borderColor: colors.white,
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.accent[500],
    borderRadius: 10,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadText: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.xs,
    color: colors.white,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  conversationName: {
    fontFamily: fonts.primary.semiBold,
    fontSize: fonts.sizes.md,
    color: colors.gray[800],
  },
  timestamp: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.gray[500],
  },
  lastMessage: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.sm,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  unreadMessage: {
    fontFamily: fonts.primary.medium,
    color: colors.gray[800],
  },
  userType: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.xs,
    color: colors.primary[600],
  },
  conversationActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginLeft: spacing.sm,
  },
  actionButton: {
    backgroundColor: colors.primary[50],
    borderRadius: 8,
    padding: spacing.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontFamily: fonts.heading.semiBold,
    fontSize: fonts.sizes.xl,
    color: colors.gray[700],
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    fontFamily: fonts.primary.regular,
    fontSize: fonts.sizes.md,
    color: colors.gray[500],
    textAlign: 'center',
  },
});