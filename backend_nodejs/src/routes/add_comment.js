import express from 'express'
import { My_journey_post, Finance_post, Philosophy_post, Science_post, Technology_post, Art_post, Politics_post } from "../models/post.js";
import { Daily_quote, Politics_hero_post } from "../models/quote.js";
import { Finance_slide_post } from "../models/slide_post.js";
import { Philosophy_article_post, Science_article_post } from "../models/article.js";
import { Technology_body_post } from "../models/body_post.js";
import { Technology_box_post } from "../models/box_post.js";
import { Art_body_post } from "../models/body_post_two.js";
import { Politics_body_post } from "../models/body_post_three.js";

const add_comment = express();

add_comment.post('/comments/add/:postId/:tableName', async (req, res) => {
    const postId = req.params.postId;
    const postType = req.params.tableName;
    const comment = req.body.comment;
    let post;

    try {
        switch (postType) {
            case 'my_journey_post':
                post = await My_journey_post.findById(postId);
                break;
            case 'finance_post':
                post = await Finance_post.findById(postId);
                break;
            case 'philosophy_post':
                post = await Philosophy_post.findById(postId);
                break;
            case 'science_post':
                post = await Science_post.findById(postId);
                break;
            case 'technology_post':
                post = await Technology_post.findById(postId);
                break;
            case 'art_post':
                post = await Art_post.findById(postId);
                break;
            case 'politics_post':
                post = await Politics_post.findById(postId);
                break;
            case 'daily_quote':
                post = await Daily_quote.findById(postId);
                break;
            case 'politics_hero_post':
                post = await Politics_hero_post.findById(postId);
                break;
            case 'finance_slide_post':
                post = await Finance_slide_post.findById(postId);
                break;
            case 'philosophy_article_post':
                post = await Philosophy_article_post.findById(postId);
                break;
            case 'science_article_post':
                post = await Science_article_post.findById(postId);
                break;
            case 'technology_body_post':
                post = await Technology_body_post.findById(postId);
                break;
            case 'technology_box_post':
                post = await Technology_box_post.findById(postId);
                break;
            case 'art_body_post':
                post = await Art_body_post.findById(postId);
                break;
            case 'politics_body_post':
                post = await Politics_body_post.findById(postId);
                break;
            default:
                res.status(400).json({ error: 'Invalid post type' });
        }

        if (post) {
            post.comments.unshift(comment);
            post.commentsCount = post.comments.length;

            const updatedPost = await post.save();

            res.json({ success: true, updatedPost });
        }
    } catch (error) {
        console.error('Error updating commmets count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default add_comment