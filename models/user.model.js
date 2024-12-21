// models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    imageUrl: { type: String, },
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password : {
        type : String,
        required : true
    },
    bio : {type : String, default : ""},
    followers : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    followings : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ]
});



const User = mongoose.model("User", userSchema);
export default User;
