
import Post from "../models/post.model.js";
import Comment from "../models/postComments.model.js";


export const createPost = async (req, res) => {
  try {
      const { cloudinaryMedia } = req;
      const { postTitle, postContent } = req.body;

      if (!cloudinaryMedia || cloudinaryMedia.length === 0) {
          return res.status(400).json({ message: 'No media files uploaded' });
      }

      const post = {
          postTitle,
          postContent,
          media: cloudinaryMedia,
      };

      await Post.create(post); // Pass the entire post object here

      return res.cookie()
      res.status(201).json({
          message: 'Post created successfully!',
          data: post,
      });
  } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({
          message: 'Error creating post',
          error,
      });
  }
};

export const showAllPosts = async(req,res)=>{
    // console.log(req.id)
    const allPosts = await Post.find()
    if(!allPosts){
        return res.status(401).json({
            msg : "no post exist",
            success : false
        })
    }
    return res.status(200).json({
        msg : "here is your data",
        allPosts,
        success : true
    })
}
    

export const likePost = async (req, res) => {
    try {
        const likeKrneWaleUserKiId = req.id; 
        const likeHoneWaliPostKiId = req.params.id;
        
        console.log(likeKrneWaleUserKiId);
        
        if (!likeKrneWaleUserKiId || !likeHoneWaliPostKiId) {
            return res.status(401).json({
                msg: "seems like something missing",
                success: false
            });
        }

        const post = await Post.findById(likeHoneWaliPostKiId); // Use your DB model to get the post
        if (!post) {
            return res.status(404).json({ msg: "Post not found", success: false });
        }

        if(post.likes.includes(likeKrneWaleUserKiId)){
            return res.status(401).json({
                msg : "you cannot like more than once",
                success : false
            })
        }
        // Add the user's ID to the post's 'likes' array
        post.likes.push(likeKrneWaleUserKiId);
        await post.save();

        return res.status(200).json({
            msg: "Post liked",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error", success: false });
    }
};


export const dislikePost = async (req, res) => {
    try {
      const dislikeKrneWaleUserKiId = req.id; // ID of the user who is disliking
      const dislikeHoneWaliPostKiId = req.params.id; // Post ID that is being disliked
  
      // Find the post by its ID
      const post = await Post.findById(dislikeHoneWaliPostKiId);
      if (!post) {
        return res.status(404).json({ msg: "Post not found", success: false });
      }
  
      // Check if the user has liked the post before
      if (post.likes.includes(dislikeKrneWaleUserKiId)) {
        // Remove the user ID from the likes array
        post.likes = post.likes.filter((userId) => userId !== dislikeKrneWaleUserKiId);
  
        // Save the post after updating the likes
        await post.save();
        
        return res.status(200).json({
          msg: "Post disliked successfully",
          success: true,
        });
      } else {
        // If the user hasn't liked the post yet
        return res.status(400).json({
          msg: "User hasn't liked the post yet",
          success: false,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Server error",
        success: false,
      });
    }
  };
  


  export const commentPost = async (req, res) => {
    try {
      const { comment } = req.body; // Extract comment from request body
      const postId = req.params.id;
      const userId = req.id;
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({
          msg: "Post not found",
          success: false,
        });
      }
  
      const newComment = await Comment.create({
        user: userId,
        postId,
        comment,
      });
  
      post.comments.push(newComment._id);
      await post.save(); // Save the post with the updated comments
  
      return res.status(201).json({
        msg: "Comment added successfully",
        success: true,
        comment: newComment,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Server error",
        success: false,
        error: error.message,
      });
    }
  };
  
  export const getPostComments = async (req, res) => {
    try {
      const postId = req.params.id;
  
      // Fetch the post with populated comments and the user data for each comment
      const post = await Post.findById(postId).populate({
        path: 'comments',
        populate: {
          path: 'user', // Assuming 'user' is a reference to the User model
          select: 'username email avatar' // You can choose which fields to include from the User model
        }
      });
  
      if (!post) {
        return res.status(404).json({
          msg: "Post not found",
          success: false,
        });
      }
  
      // Extract full user information and other required fields for each comment
      const filteredComments = post.comments.map(comment => ({
        user: comment.user, // Full user object is now included
        comment: comment.comment,
        likes: comment.likes,
      }));
  
      return res.status(200).json({
        msg: "Post comments fetched successfully",
        success: true,
        totalComments: filteredComments.length,
        comments: filteredComments, // Returning the full user info along with comments
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Server error",
        success: false,
        error: error.message,
      });
    }
  };
  