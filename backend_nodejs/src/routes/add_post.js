import express from "express";
import { My_journey_post, Finance_post, Philosophy_post, Science_post, Technology_post, Art_post, Politics_post } from "../models/post.js";
import { Daily_quote, Politics_hero_post } from "../models/quote.js";
import { Finance_slide_post } from "../models/slide_post.js";
import { Philosophy_article_post, Science_article_post } from "../models/article.js";
import { Technology_body_post } from "../models/body_post.js";
import { Technology_box_post } from "../models/box_post.js";
import { Art_body_post } from "../models/body_post_two.js";
import { Politics_body_post } from "../models/body_post_three.js";


const add_post = express();

add_post.get("/addPost", (req, res) => {
    const postType = req.query.type;

    try {
        switch (postType) {
            case 'my_journey_post':
            case 'finance_post':
            case 'philosophy_post':
            case 'science_post':
            case 'technology_post':
            case 'art_post':
            case 'politics_post':
                res.render("post_adder");
                break;
            case 'daily_quote':
            case 'politics_hero_post':
                res.render("daily_quote_adder");
                break;
            case 'finance_slide_post':
                res.render("slide_adder");
                break;
            case 'philosophy_article_post':
            case 'science_article_post':
                res.render("article_adder_template");
                break;
            case 'technology_body_post':
                res.render("body_post_adder_template");
                break;
            case 'technology_box_post':
                res.render("box_post_adder_template");
                break;
            case 'art_body_post':
                res.render("body_post2_adder_template");
                break;
            case 'politics_body_post':
                res.render("body_post3_adder_template");
                break;
            default:
                res.json({ error: 'Invalid post type' });
        }
    } catch (error) {
        console.error('Error rendering adder template:', error);
        res.json({ error: 'Error rendering adder template' });
    }
});


add_post.post("/addPost", async (req, res) => {
    const postType = req.body.postType;

    try {
        let lastPost;
        let newPost;
        let lastId = 0;

        switch (postType) {
            case 'my_journey_post': {
                const { title, content, image, date, authorURL } = req.body;

                lastPost = await My_journey_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new My_journey_post({
                    id,
                    title,
                    content: {
                        intro: content.intro,
                        body: content.body,
                        conclude: content.conclude
                    },
                    image,
                    date,
                    authorURL,
                    tableName: 'my_journey_post'
                });
                break;
            }
            case 'finance_post': {
                const { title, content, image, date, authorURL } = req.body;

                lastPost = await Finance_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Finance_post({
                    id,
                    title,
                    content: {
                        intro: content.intro,
                        body: content.body,
                        conclude: content.conclude
                    },
                    image,
                    date,
                    authorURL,
                    tableName: 'finance_post',
                });
                break;
            }
            case 'philosophy_post': {
                const { title, content, image, date, authorURL } = req.body;

                lastPost = await Philosophy_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Philosophy_post({
                    id,
                    title,
                    content: {
                        intro: content.intro,
                        body: content.body,
                        conclude: content.conclude
                    },
                    image,
                    date,
                    authorURL,
                    tableName: 'philosophy_post',
                });
                break;
            }
            case 'science_post': {
                const { title, content, image, date, authorURL } = req.body;

                lastPost = await Science_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Science_post({
                    id,
                    title,
                    content: {
                        intro: content.intro,
                        body: content.body,
                        conclude: content.conclude
                    },
                    image,
                    date,
                    authorURL,
                    tableName: 'science_post',
                });
                break;
            }
            case 'technology_post': {
                const { title, content, image, date, authorURL } = req.body;

                lastPost = await Technology_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Technology_post({
                    id,
                    title,
                    content: {
                        intro: content.intro,
                        body: content.body,
                        conclude: content.conclude
                    },
                    image,
                    date,
                    authorURL,
                    tableName: 'technology_post',
                });
                break;
            }
            case 'art_post': {
                const { title, content, image, date, authorURL } = req.body;

                lastPost = await Art_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Art_post({
                    id,
                    title,
                    content: {
                        intro: content.intro,
                        body: content.body,
                        conclude: content.conclude
                    },
                    image,
                    date,
                    authorURL,
                    tableName: 'art_post',
                });
                break;
            }
            case 'politics_post': {
                const { title, content, image, date, authorURL } = req.body;

                lastPost = await Politics_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Politics_post({
                    id,
                    title,
                    content: {
                        intro: content.intro,
                        body: content.body,
                        conclude: content.conclude
                    },
                    image,
                    date,
                    authorURL,
                    tableName: 'politics_post',
                });
                break;
            }
            case 'daily_quote': {
                const { quote, author } = req.body;

                lastPost = await Daily_quote.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Daily_quote({
                    id,
                    author,
                    quote,
                    tableName: 'daily_quote'
                });
                break;
            }
            case 'politics_hero_post': {
                const { quote, author } = req.body;

                lastPost = await Politics_hero_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Politics_hero_post({
                    id,
                    author,
                    quote,
                    tableName: 'politics_hero_post'
                });
                break;
            }
            case 'finance_slide_post': {
                const { image, URL, title } = req.body;

                lastPost = await Finance_slide_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Finance_slide_post({
                    id,
                    image,
                    URL,
                    title,
                    tableName: 'finance_slide_post'
                });
                break;
            }
            case 'philosophy_article_post': {
                const { title, date, image, content, goToURL } = req.body;

                lastPost = await Philosophy_article_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Philosophy_article_post({
                    id,
                    title,
                    date,
                    image,
                    content,
                    goToURL,
                    tableName: 'philosophy_article_post'
                });
                break;
            }
            case 'science_article_post': {
                const { title, date, image, content, goToURL } = req.body;

                lastPost = await Science_article_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Science_article_post({
                    id,
                    title,
                    date,
                    image,
                    content,
                    goToURL,
                    tableName: 'science_article_post'
                });
                break;
            }
            case 'technology_body_post': {
                const { main_title, sub_title, main_link, image, article_title, article_content, article_link, date, author_name, authorURL } = req.body;

                lastPost = await Technology_body_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Technology_body_post({
                    id,
                    main_title,
                    sub_title,
                    main_link,
                    image,
                    article_title,
                    article_content,
                    article_link,
                    date,
                    author_name,
                    authorURL,
                    tableName: 'technology_body_post'
                });
                break;
            }
            case 'technology_box_post': {
                const { title, image, link, author_name, authorURL } = req.body;

                lastPost = await Technology_box_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Technology_box_post({
                    id,
                    title,
                    image,
                    link,
                    author_name,
                    authorURL,
                    tableName: 'technology_box_post'
                });
                break;
            }
            case 'art_body_post': {
                const { title, image, type, content, link, date, writer } = req.body;

                lastPost = await Art_body_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Art_body_post({
                    id,
                    title,
                    image,
                    type,
                    content,
                    link,
                    date,
                    writer,
                    tableName: 'art_body_post'
                });
                break;
            }
            case 'politics_body_post': {
                const { title, line, link, brands, image1, image2, image3 } = req.body;

                lastPost = await Politics_body_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Politics_body_post({
                    id,
                    title,
                    line,
                    link,
                    brands: {
                        icon: brands.icon,
                        link: brands.link
                    },
                    image1,
                    image2,
                    image3,
                    tableName: 'politics_body_post'
                });
                break;
            }
            default:
                res.status(400).json({ error: 'Invalid post type' });
        }

        if (newPost) {
            await newPost.save();
            res.render('post_added_confirmation');
        }
    } catch (error) {
        console.error("Error saving post or quote:", error);
        res.status(500).send("Error saving post or quote.");
    }
});

export default add_post;