// Import Mongoose
import mongoose from 'mongoose';

// Define the comment schema
const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  postId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Post"
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  replies: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
      },
      text: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Export the schema as a model
const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
