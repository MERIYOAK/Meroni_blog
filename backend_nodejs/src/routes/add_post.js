import express from "express";
import { Post } from "../models/post.js";
import { Quote } from "../models/quote.js";
import { Slide } from "../models/slide_post.js";
import { Article } from "../models/article.js";
import { Body_post } from "../models/body_post.js";
import { Box_post } from "../models/box_post.js";
import { Body_post2 } from "../models/body_post_two.js";
import { Body_post3 } from "../models/body_post_three.js";


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
                res.render("post_adder", { postType });
                break;
            case 'daily_quote':
            case 'politics_hero_post':
                res.render("daily_quote_adder", { postType });
                break;
            case 'finance_slide_post':
                res.render("slide_adder", { postType });
                break;
            case 'philosophy_article_post':
            case 'science_article_post':
                res.render("article_adder_template", { postType });
                break;
            case 'technology_body_post':
                res.render("body_post_adder_template", { postType });
                break;
            case 'technology_box_post':
                res.render("box_post_adder_template", { postType });
                break;
            case 'art_body_post':
                res.render("body_post2_adder_template", { postType });
                break;
            case 'politics_body_post':
                res.render("body_post3_adder_template", { postType });
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
    const postType = req.query.postType;

    try {
        let lastPost;
        let newPost;
        let lastId = 0;

        switch (postType) {
            case 'my_journey_post':
            case 'finance_post':
            case 'philosophy_post':
            case 'science_post':
            case 'technology_post':
            case 'art_post':
            case 'politics_post': {
                const { title, content, image, date, authorURL } = req.body;

                lastPost = await Post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Post({
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
                    tableName: postType
                });
                break;
            }
            case 'daily_quote':
            case 'politics_hero_post': {
                const { quote, author } = req.body;

                lastPost = await Quote.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Quote({
                    id,
                    author,
                    quote,
                    tableName: postType
                });
                break;
            }
            case 'finance_slide_post': {
                const { image, URL, title } = req.body;

                lastPost = await Slide.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Slide({
                    id,
                    image,
                    URL,
                    title,
                    tableName: 'finance_slide_post'
                });
                break;
            }
            case 'philosophy_article_post':
            case 'science_article_post':
                const { title, date, image, content, goToURL } = req.body;

                lastPost = await Article.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Article({
                    id,
                    title,
                    date,
                    image,
                    content,
                    goToURL,
                    tableName: postType
                });
                break;
            case 'technology_body_post': {
                const { main_title, sub_title, main_link, image, article_title, article_content, article_link, date, author_name, authorURL } = req.body;

                lastPost = await Body_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Body_post({
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
                    tableName: postType
                });
                break;
            }
            case 'technology_box_post': {
                const { title, image, link, author_name, authorURL } = req.body;

                lastPost = await Box_post.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Box_post({
                    id,
                    title,
                    image,
                    link,
                    author_name,
                    authorURL,
                    tableName: postType
                });
                break;
            }
            case 'art_body_post': {
                const { title, image, type, content, link, date, writer } = req.body;

                lastPost = await Body_post2.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Body_post2({
                    id,
                    title,
                    image,
                    type,
                    content,
                    link,
                    date,
                    writer,
                    tableName: postType
                });
                break;
            }
            case 'politics_body_post': {
                const { title, line, link, brands, image1, image2, image3 } = req.body;

                lastPost = await Body_post3.find().sort({ id: -1 }).limit(1).exec();
                if (lastPost && lastPost.length > 0) {
                    lastId = lastPost[0].id;
                }
                const id = lastId + 1;

                newPost = new Body_post3({
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
                    tableName: postType
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