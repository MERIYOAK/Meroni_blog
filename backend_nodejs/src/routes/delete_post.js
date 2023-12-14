import express from 'express'
import { Post } from "../models/post.js";
import { Quote } from "../models/quote.js";
import { Slide } from "../models/slide_post.js";
import { Article } from "../models/article.js";
import { Body_post } from "../models/body_post.js";
import { Box_post } from "../models/box_post.js";
import { Body_post2 } from "../models/body_post_two.js";
import { Body_post3 } from "../models/body_post_three.js";

const delete_post = express();

delete_post.get('/postDeleter', async (req, res) => {
    const postId = req.query.postId;
    const postType = req.query.postType;
    let post;

    try {
        if (!isNaN(postId) && Number.isInteger(parseFloat(postId))) {
            try {
                switch (postType) {
                    case 'my_journey_post':
                    case 'finance_post':
                    case 'philosophy_post':
                    case 'science_post':
                    case 'technology_post':
                    case 'art_post':
                    case 'politics_post':
                        post = await Post.findOne({ id: parseInt(postId), tableName: postType }).exec();
                        break;
                    case 'daily_quote':
                    case 'politics_hero_post':
                        post = await Quote.findOne({ id: parseInt(postId), tableName: postType }).exec();
                        break;
                    case 'finance_slide_post':
                        post = await Slide.findOne({ id: parseInt(postId), tableName: postType }).exec();
                        break;
                    case 'philosophy_article_post':
                    case 'science_article_post':
                        post = await Article.findOne({ id: parseInt(postId), tableName: postType }).exec();
                        break;
                    case 'technology_body_post':
                        post = await Body_post.findOne({ id: parseInt(postId), tableName: postType }).exec();
                        break;
                    case 'technology_box_post':
                        post = await Box_post.findOne({ id: parseInt(postId), tableName: postType }).exec();
                        break;
                    case 'art_body_post':
                        post = await Body_post2.findOne({ id: parseInt(postId), tableName: postType }).exec();
                        break;
                    case 'politics_body_post':
                        post = await Body_post3.findOne({ id: parseInt(postId), tableName: postType }).exec();
                        break;
                    default:
                        res.status(400).json({ error: 'Invalid post type' });
                }
                if (post) {
                    res.json({ success: true, message: 'Post found', post });
                } else {
                    res.status(404).json({ error: 'Post not found' });
                }
            } catch (error) {
                console.error('Error fetching post:', error);
                res.status(500).json({ error: 'Error fetching post' });
            }
        } else {
            res.status(400).json({ error: 'Invalid postId' });
        }
    } catch (error) {
        console.error('Error rendering post deleter template:', error);
        res.status(500).json({ error: 'Error rendering post deleter template' });
    }
});

// used to delete post
delete_post.delete('/deleteMyPost/:id/:tableName', async (req, res) => {
    const postId = req.params.id;
    const postType = req.params.tableName;
    let post;
    try {
        switch (postType) {
            case 'my_journey_post':
            case 'finance_post':
            case 'philosophy_post':
            case 'science_post':
            case 'technology_post':
            case 'art_post':
            case 'politics_post':
                post = await Post.findOneAndRemove({ id: postId });
                break;
            case 'daily_quote':
            case 'politics_hero_post':
                post = await Quote.findOneAndRemove({ id: postId });
                break;
            case 'finance_slide_post': {
                post = await Slide.findOneAndRemove({ id: postId });
                break;
            }
            case 'philosophy_article_post':
            case 'science_article_post':
                post = await Article.findOneAndRemove({ id: postId });
                break;
            case 'technology_body_post': {
                post = await Body_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'technology_box_post': {
                post = await Box_post.findOneAndRemove({ id: postId });
                break;
            }
            case 'art_body_post': {
                post = await Body_post2.findOneAndRemove({ id: postId });
                break;
            }
            case 'politics_body_post': {
                post = await Body_post3.findOneAndRemove({ id: postId });
                break;
            }
            default:
                res.status(400).json({ error: 'Invalid post type' });
        }

        if (!post) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            res.json({ success: true, message: 'Post deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Error deleting post' });
    }
});

export default delete_post;
