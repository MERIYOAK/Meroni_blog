import express from 'express';
import { Comment } from '../models/reactions.js';

const decrease_comment_like = express();

decrease_comment_like.post('/comment/like/decrease', async (req, res) => {
    try {
        const { userId, commentId } = req.body;
        let comment;

        comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the user has already liked this comment
        const existingLike = comment.commentLikes.find(like => like.userId === userId);
        if (!existingLike) {
            return res.status(400).json({ message: 'User has not liked this comment' });
        }

        // Remove the commentLike from the array
        comment.commentLikes = comment.commentLikes.filter(like => like.userId !== userId);

        // Update the likes count
        comment.commentLikesCount -= 1;

        // Save the updated comment
        const updatedComment = await comment.save();

        res.status(200).json({
            success: true,
            message: 'Comment like decreased successfully',
            updatedComment: updatedComment
        });
    } catch (error) {
        console.error('Error decreasing comment like:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


export default decrease_comment_like