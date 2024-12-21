import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import mongoose from "mongoose";
import postRoutes from "./routes/post.route.js"    
import cookieParser from 'cookie-parser';
import path from "path"


// Middleware to authenticate users



dotenv.config();
const app = express();
const PORT = 3000;



const corsOptions = {
    origin: ["https://studently-2-xipj.vercel.app"], // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(cookieParser());

const _dirname = path.resolve() 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

// Routes

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/posts",postRoutes)




// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

app.use(express.static(path.join(_dirname,"/studently-frontend/dist")))

app.get("*",(_,res) => res.sendFile(path.resolve(_dirname,"studently-frontend","dist","index.html")))

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
