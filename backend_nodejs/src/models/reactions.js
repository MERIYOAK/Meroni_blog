import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now }
});

// const commentLikeSchema = new mongoose.Schema({
//     postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
//     commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     timestamp: { type: Date, default: Date.now }
// });

// const replySchema = new mongoose.Schema({
//     postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
//     commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     reply: String,
//     userFirstName: String,
//     userMiddleName: String,
//     userImage: String,
//     timestamp: { type: Date, default: Date.now }
// });

const commentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    comment: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userFirstName: String,
    userMiddleName: String,
    userImage: String,
    date: String,
    commentLikesCount: { type: Number, default: 0 },
    commentLikes: [{
        postId: String,
        userId: String,
        commentId: String,
        timestamp: { type: Date, default: Date.now }
    }
    ],
    commentRepliesCount: { type: Number, default: 0 },
    commentReplies: [
        {
            postId: String,
            commentId: String,
            userId: String,
            reply: String,
            userFirstName: String,
            userMiddleName: String,
            userImageUrl: String,
            timestamp: { type: Date, default: Date.now }
        }
    ],
});

const shareSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now }
});

const Like = mongoose.model("Like", likeSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Share = mongoose.model("Share", shareSchema);
// const CommentLike = mongoose.model("CommentLike", commentLikeSchema);
// const Reply = mongoose.model("Reply", replySchema);

export { Like, Comment, Share };