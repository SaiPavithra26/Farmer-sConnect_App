const Chat = require("../models/Chat");
const Message = require("../models/Message");

// Create a chat
exports.createChat = async (req, res) => {
  try {
    const { participants } = req.body;
    const chat = await Chat.create({ participants });
    res.status(201).json(chat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all chats for a user
exports.getChats = async (req, res) => {
  const { userId } = req.query;
  const chats = await Chat.find({ participants: userId })
    .populate("participants", "name email")
    .populate("lastMessage");
  res.json(chats);
};

// Get a single chat
exports.getChat = async (req, res) => {
  const chat = await Chat.findById(req.params.chatId)
    .populate("participants")
    .populate("lastMessage");
  if (!chat) return res.status(404).json({ message: "Chat not found" });
  res.json(chat);
};

// Get messages for a chat (paginated)
exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  const { page = 1, limit = 50 } = req.query;
  const messages = await Message.find({ chatId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json(messages);
};

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { text, type, imageUrl, fileUrl, fileName } = req.body;

    const message = await Message.create({
      chatId,
      senderId: req.user.id,
      text,
      type,
      imageUrl,
      fileUrl,
      fileName
    });

    // update chat last message
    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: message._id,
      lastMessageAt: Date.now(),
      $inc: { unreadCount: 1 }
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mark messages as read
exports.markMessagesAsRead = async (req, res) => {
  const { chatId } = req.params;
  const { messageIds } = req.body;
  await Message.updateMany(
    { _id: { $in: messageIds }, chatId },
    { $set: { isRead: true } }
  );
  await Chat.findByIdAndUpdate(chatId, { unreadCount: 0 });
  res.json({ success: true });
};

// Delete message
exports.deleteMessage = async (req, res) => {
  const { chatId, messageId } = req.params;
  await Message.findOneAndDelete({ _id: messageId, chatId });
  res.json({ success: true });
};

// Search messages
exports.searchMessages = async (req, res) => {
  const { chatId } = req.params;
  const { q } = req.query;
  const messages = await Message.find({
    chatId,
    text: { $regex: q, $options: "i" }
  });
  res.json(messages);
};

// Block & unblock user
exports.blockUser = async (req, res) => {
  const { chatId } = req.params;
  const { userId } = req.body;
  await Chat.findByIdAndUpdate(chatId, { $addToSet: { blockedUsers: userId } });
  res.json({ success: true });
};

exports.unblockUser = async (req, res) => {
  const { chatId } = req.params;
  const { userId } = req.body;
  await Chat.findByIdAndUpdate(chatId, { $pull: { blockedUsers: userId } });
  res.json({ success: true });
};

// Report chat
exports.reportChat = async (req, res) => {
  const { chatId } = req.params;
  const { reason } = req.body;
  await Chat.findByIdAndUpdate(chatId, {
    $push: { reports: { userId: req.user.id, reason } }
  });
  res.json({ success: true });
};

// Mute / unmute chat
exports.muteChat = async (req, res) => {
  const { chatId } = req.params;
  const { duration } = req.body;
  const mutedUntil = duration ? new Date(Date.now() + duration * 1000) : null;
  await Chat.findByIdAndUpdate(chatId, { mutedUntil });
  res.json({ success: true });
};

exports.unmuteChat = async (req, res) => {
  const { chatId } = req.params;
  await Chat.findByIdAndUpdate(chatId, { mutedUntil: null });
  res.json({ success: true });
};

// Archive / unarchive chat
exports.archiveChat = async (req, res) => {
  const { chatId } = req.params;
  await Chat.findByIdAndUpdate(chatId, { isArchived: true });
  res.json({ success: true });
};

exports.unarchiveChat = async (req, res) => {
  const { chatId } = req.params;
  await Chat.findByIdAndUpdate(chatId, { isArchived: false });
  res.json({ success: true });
};

// Delete chat
exports.deleteChat = async (req, res) => {
  const { chatId } = req.params;
  await Chat.findByIdAndDelete(chatId);
  await Message.deleteMany({ chatId });
  res.json({ success: true });
};

// Get unread count for a user
exports.getUnreadCount = async (req, res) => {
  const { userId } = req.query;
  const count = await Chat.aggregate([
    { $match: { participants: { $in: [mongoose.Types.ObjectId(userId)] } } },
    { $group: { _id: null, total: { $sum: "$unreadCount" } } }
  ]);
  res.json({ count: count[0]?.total || 0 });
};

// Get chat between two users
exports.getChatBetweenUsers = async (req, res) => {
  const { user1, user2 } = req.query;
  let chat = await Chat.findOne({
    participants: { $all: [user1, user2] }
  }).populate("participants");
  if (!chat) {
    chat = await Chat.create({ participants: [user1, user2] });
  }
  res.json(chat);
};
