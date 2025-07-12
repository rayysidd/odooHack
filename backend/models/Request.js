const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skillOffered: {
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    skillName: {
      type: String,
      required: true
    }
  },
  skillRequested: {
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    skillName: {
      type: String,
      required: true
    }
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'cancelled', 'completed'],
    default: 'pending'
  },
  proposedDuration: {
    type: String,
    required: true
  },
  proposedSchedule: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  }
});

// Update the updatedAt field before saving
requestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Request', requestSchema);