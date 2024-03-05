import express from "express";
import { Post } from "../models/post.js";
import { Like, Share, Comment } from "../models/reactions.js";

const shared_post = express();
async function populateReactions(post) {
    const populatedPost = {
        ...post.toObject(),
        likes: await Like.find({ postId: post._id }),
        shares: await Share.find({ postId: post._id }),
        comments: await Comment.find({ postId: post._id }),
    };

    return populatedPost;
}


shared_post.get('/shared_post/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;

        if (!postId) {
            return res.status(400).json({ error: 'Post ID is required' });
        }

        const post = await Post.findOne({ _id: postId });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const populatedPost = await populateReactions(post);

        res.render('story_full_screen', { post: populatedPost });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

export default shared_post;

