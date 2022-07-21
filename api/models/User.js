const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        'https://images.pexels.com/photos/7137432/pexels-photo-7137432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Editor: Number,
      Admin: Number,
    },
    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
