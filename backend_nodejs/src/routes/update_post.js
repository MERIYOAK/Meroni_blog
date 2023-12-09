import express from 'express';
import { Post } from "../models/post.js";
import { Quote } from "../models/quote.js";
import { Slide } from "../models/slide_post.js";
import { Article } from "../models/article.js";
import { Body_post } from "../models/body_post.js";
import { Box_post } from "../models/box_post.js";
import { Body_post2 } from "../models/body_post_two.js";
import { Body_post3 } from "../models/body_post_three.js";

const update_post = express();

// used to render id input page based on post type
update_post.get("/updatePost", (req, res) => {
    try {
        res.render("post_updater");
    } catch (error) {
        console.error("Error rendering post updater:", error);
        res.status(500).send("Error rendering post updater.");
    }
});

// used to render post updater template based on postId
update_post.get('/postUpdater', async (req, res) => {
    const postId = req.query.postId;
    const postType = req.query.postType;
    let post;

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
                    res.status(400).json({ error: 'Invalid post type, or file not exist' });
            }

            if (post) {
                switch (postType) {
                    case 'my_journey_post':
                    case 'finance_post':
                    case 'philosophy_post':
                    case 'science_post':
                    case 'technology_post':
                    case 'art_post':
                    case 'politics_post':
                        res.render('post_updater_template', { post });
                        break;
                    case 'daily_quote':
                    case 'politics_hero_post':
                        res.render('daily_quote_updater_template', { post });
                        break;
                    case 'finance_slide_post':
                        res.render('slide_updater_template', { post });
                        break;
                    case 'philosophy_article_post':
                    case 'science_article_post':
                        res.render('article_updater_template', { post });
                        break;
                    case 'technology_body_post':
                        res.render('body_post_updater_template', { post });
                        break;
                    case 'technology_box_post':
                        res.render('box_post_updater_template', { post });
                        break;
                    case 'art_body_post':
                        res.render('body_post2_updater_template', { post });
                        break;
                    case 'politics_body_post':
                        res.render('body_post3_updater_template', { post });
                        break;
                    default:
                        res.status(400).json({ error: 'Invalid post type' });
                }
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
});

// used to update post
update_post.post('/updateMyPost/:id/:tableName', async (req, res) => {
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
                post = await Post.findOne({ id: postId });
                break;
            case 'daily_quote':
            case 'politics_hero_post':
                post = await Quote.findOne({ id: postId });
                break;
            case 'finance_slide_post': {
                post = await Slide.findOne({ id: postId });
                break;
            }
            case 'philosophy_article_post':
            case 'science_article_post':
                post = await Article.findOne({ id: postId });
                break;
            case 'technology_body_post': {
                post = await Body_post.findOne({ id: postId });
                break;
            }
            case 'technology_box_post': {
                post = await Box_post.findOne({ id: postId });
                break;
            }
            case 'art_body_post': {
                post = await Body_post2.findOne({ id: postId });
                break;
            }
            case 'politics_body_post': {
                post = await Body_post3.findOne({ id: postId });
                break;
            }
            default:
                res.status(400).json({ error: 'Invalid post type' });
        }

        if (!post) {
            res.status(404).json({ error: 'Post not found' });
        } else {
            switch (postType) {
                case 'my_journey_post':
                case 'finance_post':
                case 'philosophy_post':
                case 'science_post':
                case 'technology_post':
                case 'art_post':
                case 'politics_post':
                    post.title = req.body.title;
                    post.content.intro = req.body.content.intro;
                    post.content.body = req.body.content.body;
                    post.content.conclude = req.body.content.conclude;
                    post.image = req.body.image;
                    post.date = req.body.date;
                    post.authorURL = req.body.authorURL;
                    break;
                case 'daily_quote':
                case 'politics_hero_post':
                    post.quote = req.body.quote;
                    post.author = req.body.author;
                    break;
                case 'finance_slide_post':
                    post.image = req.body.image;
                    post.URL = req.body.URL;
                    post.title = req.body.title;
                    break;
                case 'philosophy_article_post':
                case 'science_article_post':
                    post.title = req.body.title;
                    post.date = req.body.date;
                    post.image = req.body.image;
                    post.content = req.body.content;
                    post.goToURL = req.body.goToURL;
                    break;
                case 'technology_body_post':
                    post.main_title = req.body.main_title;
                    post.sub_title = req.body.sub_title;
                    post.main_link = req.body.main_link;
                    post.image = req.body.image;
                    post.article_title = req.body.article_title;
                    post.article_content = req.body.article_content;
                    post.article_link = req.body.article_link;
                    post.date = req.body.date;
                    post.author_name = req.body.author_name;
                    post.authorURL = req.body.authorURL;
                    break;
                case 'technology_box_post':
                    post.title = req.body.title;
                    post.image = req.body.image;
                    post.link = req.body.link;
                    post.author_name = req.body.author_name;
                    post.authorURL = req.body.authorURL;
                    break;
                case 'art_body_post':
                    post.title = req.body.title;
                    post.image = req.body.image;
                    post.link = req.body.link;
                    post.content = req.body.content;
                    post.type = req.body.type;
                    post.date = req.body.date;
                    post.writer = req.body.writer;
                    break;
                case 'politics_body_post':
                    post.title = req.body.title;
                    post.line = req.body.line;
                    post.link = req.body.link;
                    post.brands.icon = req.body.brands.icon;
                    post.brands.link = req.body.brands.link;
                    post.image1 = req.body.image1;
                    post.image2 = req.body.image2;
                    post.image3 = req.body.image3;
                    break;
                default:
                    res.status(400).json({ error: 'Invalid post type' });
            }

            await post.save();
            res.render('post_updated_confirmation');
        }
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Error updating post' });
    }
});

export default update_post;