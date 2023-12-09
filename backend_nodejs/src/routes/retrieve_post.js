import express from 'express'
import { Post } from "../models/post.js";
import { Quote } from "../models/quote.js";
import { Slide } from "../models/slide_post.js";
import { Article } from "../models/article.js";
import { Body_post } from "../models/body_post.js";
import { Box_post } from "../models/box_post.js";
import { Body_post2 } from "../models/body_post_two.js";
import { Body_post3 } from "../models/body_post_three.js";

const retrieve_post = express();

retrieve_post.get("/allPost", async (req, res) => {
    const postType = req.query.type;
    let allPosts;

    try {
        switch (postType) {
            case 'my_journey_post':
            case 'finance_post':
            case 'philosophy_post':
            case 'science_post':
            case 'technology_post':
            case 'art_post':
            case 'politics_post': {
                allPosts = await Post.find({ tableName: postType }).sort({ id: -1 });
                break;
            }
            case 'philosophy_article_post':
            case 'science_article_post':
                allPosts = await Article.find({ tableName: postType }).sort({ id: -1 });
                break;
            case 'technology_body_post':
                allPosts = await Body_post.find({ tableName: postType }).sort({ id: -1 });
                break;
            case 'art_body_post':
                allPosts = await Body_post2.find({ tableName: postType }).sort({ id: -1 });
                break;
            case 'politics_body_post':
                allPosts = await Body_post3.find({ tableName: postType }).sort({ id: -1 });
                break;
            case 'technology_box_post':
                allPosts = await Box_post.find({ tableName: postType }).sort({ id: -1 });
                break;
            case 'daily_quote':
            case 'politics_hero_post':
                allPosts = await Quote.find({ tableName: postType }).sort({ id: -1 });
                break;
            case 'finance_slide_post':
                allPosts = await Slide.find({ tableName: postType }).sort({ id: -1 });
                break;
            default:
                res.status(400).json({ error: 'Invalid post type' });
        }

        if (allPosts) {
            switch (postType) {
                case 'my_journey_post':
                case 'finance_post':
                case 'philosophy_post':
                case 'science_post':
                case 'technology_post':
                case 'art_post':
                case 'politics_post':
                    res.render('all_posts', { posts: allPosts });
                    break;
                case 'philosophy_article_post':
                case 'science_article_post':
                    res.render('all_articles', { posts: allPosts });
                    break;
                case 'technology_body_post':
                    res.render('all_body_posts', { posts: allPosts });
                    break;
                case 'art_body_post':
                    res.render('all_body_post2', { posts: allPosts });
                    break;
                case 'politics_body_post':
                    res.render('all_body_post3', { posts: allPosts });
                    break;
                case 'technology_box_post':
                    res.render('all_box_posts', { posts: allPosts });
                    break;
                case 'politics_hero_post':
                case 'daily_quote':
                    res.render('all_small_posts', { posts: allPosts });
                    break;
                case 'finance_slide_post':
                    res.render('all_slides', { posts: allPosts });
                    break;
                default:
                    res.status(400).json({ error: 'Invalid post type' });
            }
        } else {
            res.status(404).json({ error: 'Posts not found' });
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Error fetching posts' });
    }
});

export default retrieve_post;