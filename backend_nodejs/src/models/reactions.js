import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    comment: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userFirstName: String,
    userMiddleName: String,
    userImage: String,
    date: String
});

const shareSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now }
});

const Like = mongoose.model("Like", likeSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Share = mongoose.model("Share", shareSchema);

export { Like, Comment, Share };