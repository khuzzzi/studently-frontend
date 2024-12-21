import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  author : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  postTitle: {
    type: String,
    required: true,
  },
  postContent: {
    type: String,
    required: true,
  },
  media: [{
    type: String, // Stores the Cloudinary URL as a string
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: [], // Default to an empty array
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: [],
  }],
});

const Post = mongoose.model('Post', postSchema);

export default Post;
