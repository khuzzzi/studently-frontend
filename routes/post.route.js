import express from "express";
import { commentPost, createPost, dislikePost,  getPostComments,  likePost, showAllPosts } from "../controllers/post.controller.js";
import upload from "../middleware/multer.js";
import { uploadToCloudinary } from "../middleware/cloudinary/cloudinary.js";
import { isAuthenticated } from "../middleware/authentication.js";

const Router = express.Router();

Router.route("/createPost").post(upload.array("media"), uploadToCloudinary,  createPost);
Router.route("/allPosts").get(showAllPosts);
Router.route("/likePost/:id").post(isAuthenticated, likePost);
Router.route("/dislikePost/:id").post(isAuthenticated, dislikePost);
Router.route("/commentPost/:id").post(isAuthenticated, commentPost);
Router.route("/getPostComments/:id").get(isAuthenticated, getPostComments);
export default Router;
