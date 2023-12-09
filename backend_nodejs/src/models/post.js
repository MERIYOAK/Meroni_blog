import mongoose from "mongoose";

const post_schema = new mongoose.Schema({
    tableName: String,
    id: Number,
    title: String,
    content: {
        intro: String,
        body: String,
        conclude: String
    },
    image: String,
    date: String,
    authorURL: String,
    likesCount: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
    commentsCount: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    sharesCount: { type: Number, default: 0 },
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Share' }],
});

const Post = mongoose.model("Post", post_schema);

export { Post };