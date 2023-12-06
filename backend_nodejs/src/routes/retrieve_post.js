import express from 'express'
import { My_journey_post, Finance_post, Philosophy_post, Science_post, Technology_post, Art_post, Politics_post } from "../models/post.js";
import { Daily_quote, Politics_hero_post } from "../models/quote.js";
import { Finance_slide_post } from "../models/slide_post.js";
import { Philosophy_article_post, Science_article_post } from "../models/article.js";
import { Technology_body_post } from "../models/body_post.js";
import { Technology_box_post } from "../models/box_post.js";
import { Art_body_post } from "../models/body_post_two.js";
import { Politics_body_post } from "../models/body_post_three.js";

const retrieve_post = express();

retrieve_post.get("/allPost", async (req, res) => {
    const postType = req.query.type;
    let allPosts;

    try {
        switch (postType) {
            case 'my_journey_post':
                allPosts = await My_journey_post.find().sort({ id: -1 });
                break;
            case 'finance_post':
                allPosts = await Finance_post.find().sort({ id: -1 });
                break;
            case 'philosophy_post':
                allPosts = await Philosophy_post.find().sort({ id: -1 });
                break;
            case 'science_post':
                allPosts = await Science_post.find().sort({ id: -1 });
                break;
            case 'technology_post':
                allPosts = await Technology_post.find().sort({ id: -1 });
                break;
            case 'art_post':
                allPosts = await Art_post.find().sort({ id: -1 });
                break;
            case 'politics_post':
                allPosts = await Politics_post.find().sort({ id: -1 });
                break;
            case 'philosophy_article_post':
                allPosts = await Philosophy_article_post.find().sort({ id: -1 });
                break;
            case 'science_article_post':
                allPosts = await Science_article_post.find().sort({ id: -1 });
                break;
            case 'technology_body_post':
                allPosts = await Technology_body_post.find().sort({ id: -1 });
                break;
            case 'art_body_post':
                allPosts = await Art_body_post.find().sort({ id: -1 });
                break;
            case 'politics_body_post':
                allPosts = await Politics_body_post.find().sort({ id: -1 });
                break;
            case 'technology_box_post':
                allPosts = await Technology_box_post.find().sort({ id: -1 });
                break;
            case 'politics_hero_post':
                allPosts = await Politics_hero_post.find().sort({ id: -1 });
                break;
            case 'daily_quote':
                allPosts = await Daily_quote.find().sort({ id: -1 });
                break;
            case 'finance_slide_post':
                allPosts = await Finance_slide_post.find().sort({ id: -1 });
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