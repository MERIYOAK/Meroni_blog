import express from 'express';
import { Comment } from '../models/reactions.js'

const increase_comment_like = express();


increase_comment_like.post('/comment/like/increase', async (req, res) => {
    try {
        const { postId, userId, commentId } = req.body;
        let comment;

        comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the user has already liked this comment
        const existingLike = comment.commentLikes.find(like => like.userId === userId);
        if (existingLike) {
            return res.status(400).json({ message: 'User already liked this comment' });
        }

        // Add a new commentLike to the array
        comment.commentLikes.push({
            userId,
            postId,
            commentId,
            timestamp: Date.now()
        });

        // Update the likes count
        comment.commentLikesCount += 1;

        // Save the updated comment
        const updatedComment = await comment.save();

        res.status(200).json({
            success: true,
            message: 'Comment like increased successfully',
            updatedComment: updatedComment
        });
    } catch (error) {
        console.error('Error increasing comment like:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


export default increase_comment_like