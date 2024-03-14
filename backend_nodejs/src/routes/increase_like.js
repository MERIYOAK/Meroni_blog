import express from 'express';
import { Post } from '../models/post.js';
import { Like } from '../models/reactions.js';
import populateReactions from '../middlewares/populateReactions.js';

const increase_like = express();

// Route to increase likes count
increase_like.post('/likes/increase', async (req, res) => {
    try {
        const postId = req.body.user.postId
        const userId = req.body.user.userId;
        let post;

        post = await Post.findById(postId);

        if (post) {
            post.likesCount++;

            const like = new Like({
                postId: postId,
                userId: userId,
                timestamp: Date.now(),
            });

            await like.save();

            const updatedPost = await post.save();

            const populatedPosts = await populateReactions([updatedPost]);
            const populatedPost = populatedPosts[0];

            res.status(200).json({
                success: true,
                message: 'Likes count increased successfully',
                updatedPost: populatedPost,
            });
        }
    } catch (error) {
        console.error('Error updating likes count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default increase_like;
