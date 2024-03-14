import express from 'express';
import { Post } from '../models/post.js';
import { Like } from '../models/reactions.js';
import populateReactions from '../middlewares/populateReactions.js';

const decrease_like = express();

decrease_like.post('/likes/decrease', async (req, res) => {
    try {
        const postId = req.body.user.postId;
        const userId = req.body.user.userId;

        // Find the like in the Like collection based on postId and userId
        const like = await Like.findOne({ postId, userId });

        if (like) {
            // Delete the found like
            await like.deleteOne();

            // Decrease the likesCount in the corresponding post
            const post = await Post.findById(postId);

            if (post) {
                post.likesCount--;

                // Save the updated post
                const updatedPost = await post.save();

                // Populate the updated post with likes
                const populatedPosts = await populateReactions([updatedPost]);
                const populatedPost = populatedPosts[0];

                res.status(200).json({
                    success: true,
                    message: 'Like deleted successfully',
                    updatedPost: populatedPost,
                });
            } else {
                res.status(404).json({ error: 'Post not found' });
            }
        } else {
            res.status(404).json({ error: 'Like not found' });
        }
    } catch (error) {
        console.error('Error deleting like:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default decrease_like;
