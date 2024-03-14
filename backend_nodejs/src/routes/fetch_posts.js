import express from "express";
import { Post } from "../models/post.js";
import { Quote } from "../models/quote.js";
import { Slide } from "../models/slide_post.js";
import { Article } from "../models/article.js";
import { Body_post } from "../models/body_post.js";
import { Box_post } from "../models/box_post.js";
import { Body_post2 } from "../models/body_post_two.js";
import { Body_post3 } from "../models/body_post_three.js";
import populateReactions from "../middlewares/populateReactions.js";

const fetch_posts = express();

fetch_posts.get('/postofMyJourney', async (req, res) => {
    try {
        const daily_quote = await Quote.findOne({ tableName: 'daily_quote' }).sort({ _id: -1 });

        const my_journey_posts = await Post.find({ tableName: 'my_journey_post' }).sort({ id: -1 });
        const populatedMyJourneyPosts = await populateReactions(my_journey_posts);

        res.json({ daily_quote, my_journey_posts: populatedMyJourneyPosts });
    } catch (error) {
        console.error('Error fetching post data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

fetch_posts.get('/postofFinance', async (req, res) => {
    try {
        const finance_posts = await Post.find({ tableName: 'finance_post' }).sort({ id: -1 });
        const populatedFinancePosts = await populateReactions(finance_posts);

        const finance_slide_posts = await Slide.find({ tableName: 'finance_slide_post' }).sort({ id: -1 });
        res.json({ finance_posts: populatedFinancePosts, finance_slide_posts });
    } catch (error) {
        console.error('Error fetching post data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

fetch_posts.get('/postofPhilosophy', async (req, res) => {
    try {
        const philosophy_posts = await Post.find({ tableName: 'philosophy_post' }).sort({ id: -1 });
        const populatedPhilosophyPosts = await populateReactions(philosophy_posts);

        const philosophy_article_posts = await Article.find({ tableName: 'philosophy_article_post' }).sort({ id: -1 });
        res.json({ philosophy_posts: populatedPhilosophyPosts, philosophy_article_posts });
    } catch (error) {
        console.error('Error fetching post data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

fetch_posts.get('/postofScience', async (req, res) => {
    try {
        const science_posts = await Post.find({ tableName: 'science_post' }).sort({ id: -1 });
        const populatedSciencePosts = await populateReactions(science_posts);

        const sci_hero_posts = await Article.find({ tableName: 'science_article_post' }).sort({ _id: -1 }).limit(6);
        const mainPost = sci_hero_posts[0];
        res.json({ science_posts: populatedSciencePosts, sci_hero_posts, mainPost });
    } catch (error) {
        console.error('Error fetching post data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

fetch_posts.get('/postofTech', async (req, res) => {
    try {
        const tech_posts = await Post.find({ tableName: 'technology_post' }).sort({ id: -1 });
        const populatedTechPosts = await populateReactions(tech_posts);

        const tech_body_posts = await Body_post.find({ tableName: 'technology_body_post' }).sort({ _id: -1 }).limit(2);
        const tech_trending_box_posts = await Box_post.find({ tableName: 'technology_box_post' }).sort({ id: -1 });
        res.json({ tech_posts: populatedTechPosts, tech_body_posts, tech_trending_box_posts });
    } catch (error) {
        console.error('Error fetching post data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

fetch_posts.get('/postofArt', async (req, res) => {
    try {
        const art_posts = await Post.find({ tableName: 'art_post' }).sort({ id: -1 });
        const populatedArtPosts = await populateReactions(art_posts);

        const art_body_posts = await Body_post2.find({ tableName: 'art_body_post' }).sort({ id: -1 }).limit(10);
        res.json({ art_posts: populatedArtPosts, art_body_posts });
    } catch (error) {
        console.error('Error fetching post data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

fetch_posts.get('/postofPolitics', async (req, res) => {
    try {
        const black_body_content = await Body_post3.findOne({ tableName: 'politics_body_post' }).sort({ _id: -1 });
        const hero_content_box_posts = await Quote.find({ tableName: 'politics_hero_post' }).sort({ _id: -1 }).limit(3);

        const politics_posts = await Post.find({ tableName: 'politics_post' }).sort({ id: -1 });
        const populatedPoliticsPosts = await populateReactions(politics_posts);

        res.json({ black_body_content, hero_content_box_posts, politics_posts: populatedPoliticsPosts });
    } catch (error) {
        console.error('Error fetching post data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default fetch_posts;

