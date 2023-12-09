import exress from 'express';
import { Post } from "../models/post.js";
import { Share } from '../models/reactions.js';
import { populateReactions } from './fetch_posts.js';

const shares = exress();

shares.post('/shares', async (req, res) => {
    try {
        const postId = req.body.user.postId;
        const userId = req.body.user.userId;
        let post;

        post = await Post.findById(postId);

        if (post) {
            post.sharesCount++;

            const user = new Share({
                postId: postId,
                userId: userId,
                timestamp: Date.now(),
            });

            await user.save();

            const updatedPost = await post.save();

            const populatedPosts = await populateReactions([updatedPost]);
            const populatedPost = populatedPosts[0];

            res.status(200).json({
                success: true,
                message: 'Post shared successfully',
                updatedPost: populatedPost,
            });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error('Error sharing post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default shares