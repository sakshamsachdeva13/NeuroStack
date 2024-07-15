const mongoose = require('mongoose');

const userConfigSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  config: {
    type: [String], // Assuming config is a list of strings; adjust as needed
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  }
});

// Pre-save hook to update the updatedDate on document update
userConfigSchema.pre('save', function(next) {
  this.updatedDate = Date.now();
  next();
});

const UserConfig = mongoose.model('UserConfig', userConfigSchema);

module.exports = UserConfig;
