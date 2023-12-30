import express from 'express';
import { Comment } from '../models/reactions.js';

const add_reply = express();

add_reply.post('/comment/reply/add', async (req, res) => {
    try {
        const commentId = req.body.reply.commentId;
        const reply = req.body.reply;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        comment.commentReplies.push(reply);
        comment.commentRepliesCount++;

        const updatedComment = await comment.save();

        res.status(200).json({
            success: true,
            message: 'Comment reply added successfully',
            updatedComment: updatedComment
        });
    } catch (error) {
        console.error('Error adding comment reply:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


export default add_reply