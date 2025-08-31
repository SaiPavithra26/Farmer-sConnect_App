const admin = require('firebase-admin');
const User = require('../models/User.js');

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        project_id: process.env.FIREBASE_PROJECT_ID,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      })
    });
  }
} catch (e) { console.warn('FCM init skipped:', e.message); }

exports.pushToUser = async (userId, title, body = '') => {
  try {
    const user = await User.findById(userId);
    if (!user?.deviceToken) return;
    await admin.messaging().send({ token: user.deviceToken, notification: { title, body } });
  } catch (e) { console.warn('FCM push failed:', e.message); }
};
