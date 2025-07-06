const mongoose = require('mongoose');

  const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    deadline: { type: Date },
    category: { type: String, default: 'General' },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    reminder: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });

  module.exports = mongoose.model('Task', taskSchema);