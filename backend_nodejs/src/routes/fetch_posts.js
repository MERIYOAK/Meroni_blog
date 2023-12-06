import express from "express";
import { My_journey_post, Finance_post, Philosophy_post, Science_post, Technology_post, Art_post, Politics_post } from "../models/post.js";
import { Daily_quote, Politics_hero_post } from "../models/quote.js";
import { Finance_slide_post } from "../models/slide_post.js";
import { Philosophy_article_post, Science_article_post } from "../models/article.js";
import { Technology_body_post } from "../models/body_post.js";
import { Technology_box_post } from "../models/box_post.js";
import { Art_body_post } from "../models/body_post_two.js";
import { Politics_body_post } from "../models/body_post_three.js";

const fetch_posts = express();

fetch_posts.get('/posts', async (req, res) => {
    try {
        const my_journey_posts = await My_journey_post.find().sort({ id: -1 });
        const daily_quote = await Daily_quote.findOne().sort({ _id: -1 });
        const finance_posts = await Finance_post.find().sort({ id: -1 });
        const finance_slide_posts = await Finance_slide_post.find().sort({ id: -1 });
        const philosophy_article_posts = await Philosophy_article_post.find().sort({ id: -1 });
        const philosophy_posts = await Philosophy_post.find().sort({ id: -1 });
        const science_posts = await Science_post.find().sort({ id: -1 });
        const sci_hero_posts = await Science_article_post.find().sort({ _id: -1 }).limit(6);
        const tech_posts = await Technology_post.find().sort({ id: -1 });
        const tech_body_posts = await Technology_body_post.find().sort({ _id: -1 }).limit(2);
        const tech_trending_box_posts = await Technology_box_post.find().sort({ id: -1 });
        const art_posts = await Art_post.find().sort({ id: -1 });
        const art_body_posts = await Art_body_post.find().sort({ id: -1 }).limit(10);
        const politics_posts = await Politics_post.find().sort({ id: -1 });
        const black_body_content = await Politics_body_post.findOne().sort({ _id: -1 });
        const hero_content_box_posts = await Politics_hero_post.find().sort({ _id: -1 }).limit(3);


        res.json({
            my_journey_posts,
            daily_quote,
            finance_posts,
            finance_slide_posts,
            philosophy_article_posts,
            philosophy_posts,
            science_posts,
            sci_hero_posts,
            tech_posts,
            tech_body_posts,
            tech_trending_box_posts,
            art_posts,
            art_body_posts,
            politics_posts,
            black_body_content,
            hero_content_box_posts
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

export default fetch_posts;