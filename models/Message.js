// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  msgId: { type: String, unique: true, required: true },
  message: { type: String, required: true },
  senderId: { type: String, required: true, ref: 'User' },
  recipientId: { type: String, required: true, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
