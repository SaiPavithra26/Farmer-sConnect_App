const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const chatCtrl = require("../controllers/chatController");

// CRUD
router.post("/", protect, chatCtrl.createChat);
router.get("/", protect, chatCtrl.getChats);
router.get("/between", protect, chatCtrl.getChatBetweenUsers);
router.get("/unread-count", protect, chatCtrl.getUnreadCount);
router.get("/:chatId", protect, chatCtrl.getChat);
router.get("/:chatId/messages", protect, chatCtrl.getMessages);
router.post("/:chatId/messages", protect, chatCtrl.sendMessage);
router.put("/:chatId/read", protect, chatCtrl.markMessagesAsRead);
router.delete("/:chatId/messages/:messageId", protect, chatCtrl.deleteMessage);
router.get("/:chatId/search", protect, chatCtrl.searchMessages);

// Actions
router.put("/:chatId/block", protect, chatCtrl.blockUser);
router.put("/:chatId/unblock", protect, chatCtrl.unblockUser);
router.post("/:chatId/report", protect, chatCtrl.reportChat);
router.put("/:chatId/mute", protect, chatCtrl.muteChat);
router.put("/:chatId/unmute", protect, chatCtrl.unmuteChat);
router.put("/:chatId/archive", protect, chatCtrl.archiveChat);
router.put("/:chatId/unarchive", protect, chatCtrl.unarchiveChat);
router.delete("/:chatId", protect, chatCtrl.deleteChat);

module.exports = router;
