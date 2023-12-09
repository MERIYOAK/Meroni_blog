import express from 'express'
import { Post } from "../models/post.js";
import { Comment } from '../models/reactions.js';
import { populateReactions } from './fetch_posts.js';

const add_comment = express();

add_comment.post('/comments/add', async (req, res) => {
    try {
        const postId = req.body.comment.postId;
        const commentData = req.body.comment;
        let post;

        post = await Post.findById(postId);

        if (post) {
            post.commentsCount++;

            const comment = new Comment({
                postId: postId,
                comment: commentData.comment,
                userId: commentData.userId,
                userFirstName: commentData.userFirstName,
                userMiddleName: commentData.userMiddleName,
                userImage: commentData.userImage,
                date: commentData.date,
            });

            await comment.save();

            const updatedPost = await post.save();

            const populatedPosts = await populateReactions([updatedPost]);
            const populatedPost = populatedPosts[0];

            res.json({ success: true, updatedPost: populatedPost });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error('Error updating commmets count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default add_comment