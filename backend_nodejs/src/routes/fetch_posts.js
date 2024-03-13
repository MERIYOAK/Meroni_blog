import express from "express";
import { Post } from "../models/post.js";
import { Quote } from "../models/quote.js";
import { Slide } from "../models/slide_post.js";
import { Article } from "../models/article.js";
import { Body_post } from "../models/body_post.js";
import { Box_post } from "../models/box_post.js";
import { Body_post2 } from "../models/body_post_two.js";
import { Body_post3 } from "../models/body_post_three.js";
import { Like, Share, Comment } from "../models/reactions.js";
import { User } from "../models/user.js";
import { generatePresignedUrls } from "../controllers/imageUrlGenerator.js";

const fetch_posts = express();

async function populateReactions(posts) {
    const populatedPosts = [];

    for (const post of posts) {
        const populatedPost = {
            ...post.toObject(),
            comments: await Comment.find({ postId: post._id }),
            likes: await Like.find({ postId: post._id }),
            shares: await Share.find({ postId: post._id }),
            likesCount: await Like.countDocuments({ postId: post._id }),
            sharesCount: await Share.countDocuments({ postId: post._id }),
            commentsCount: await Comment.countDocuments({ postId: post._id }),
        };

        // Generate pre-signed URLs for users who commented on the post
        const commentUsers = populatedPost.comments.map(comment => comment.userId);

        const commentUsersDetails = await User.find({ _id: { $in: commentUsers } });

        const commentUsersUrls = await generatePresignedUrls(commentUsersDetails);

        const replyUsers = populatedPost.comments.reduce((users, comment) => {
            if (comment.commentReplies) {
                const replyUserIds = comment.commentReplies.map(reply => reply.userId);
                return users.concat(replyUserIds);
            }
            return users;
        }, []);

        const replyUsersDetails = await User.find({ _id: { $in: replyUsers } });
        const replyUsersUrls = await generatePresignedUrls(replyUsersDetails);

        populatedPost.comments.map(comment => {
            const imageUrl = commentUsersUrls.find(url => url.userId.toString() === comment.userId.toString())?.imageUrl;
            comment.userImage = imageUrl;
            if (comment.commentReplies) {
                comment.commentReplies.map(reply => {
                    const replyImageUrl = replyUsersUrls.find(url => url.userId.toString() === reply.userId.toString())?.imageUrl;
                    reply.userImageUrl = replyImageUrl;
                });
            }
        });

        populatedPosts.push(populatedPost);
    }

    return populatedPosts;
}


fetch_posts.get('/posts', async (req, res) => {
    try {
        const my_journey_posts = await Post.find({ tableName: 'my_journey_post' }).sort({ id: -1 });
        const populatedMyJourneyPosts = await populateReactions(my_journey_posts);

        const daily_quote = await Quote.findOne({ tableName: 'daily_quote' }).sort({ _id: -1 });

        const finance_posts = await Post.find({ tableName: 'finance_post' }).sort({ id: -1 });
        const populatedFinancePosts = await populateReactions(finance_posts);

        const finance_slide_posts = await Slide.find({ tableName: 'finance_slide_post' }).sort({ id: -1 });
        const philosophy_article_posts = await Article.find({ tableName: 'philosophy_article_post' }).sort({ id: -1 });
        const philosophy_posts = await Post.find({ tableName: 'philosophy_post' }).sort({ id: -1 });
        const populatedPhilosophyPosts = await populateReactions(philosophy_posts);

        const science_posts = await Post.find({ tableName: 'science_post' }).sort({ id: -1 });
        const populatedSciencePosts = await populateReactions(science_posts);

        const sci_hero_posts = await Article.find({ tableName: 'science_article_post' }).sort({ _id: -1 }).limit(6);
        const tech_posts = await Post.find({ tableName: 'technology_post' }).sort({ id: -1 });
        const populatedTechPosts = await populateReactions(tech_posts);

        const tech_body_posts = await Body_post.find({ tableName: 'technology_body_post' }).sort({ _id: -1 }).limit(2);
        const tech_trending_box_posts = await Box_post.find({ tableName: 'technology_box_post' }).sort({ id: -1 });
        const art_posts = await Post.find({ tableName: 'art_post' }).sort({ id: -1 });
        const populatedArtPosts = await populateReactions(art_posts);

        const art_body_posts = await Body_post2.find({ tableName: 'art_body_post' }).sort({ id: -1 }).limit(10);
        const politics_posts = await Post.find({ tableName: 'politics_post' }).sort({ id: -1 });
        const populatedPoliticsPosts = await populateReactions(politics_posts);

        const black_body_content = await Body_post3.findOne({ tableName: 'politics_body_post' }).sort({ _id: -1 });
        const hero_content_box_posts = await Quote.find({ tableName: 'politics_hero_post' }).sort({ _id: -1 }).limit(3);

        res.json({
            my_journey_posts: populatedMyJourneyPosts,
            daily_quote,
            finance_posts: populatedFinancePosts,
            finance_slide_posts,
            philosophy_article_posts,
            philosophy_posts: populatedPhilosophyPosts,
            science_posts: populatedSciencePosts,
            sci_hero_posts,
            tech_posts: populatedTechPosts,
            tech_body_posts,
            tech_trending_box_posts,
            art_posts: populatedArtPosts,
            art_body_posts,
            politics_posts: populatedPoliticsPosts,
            black_body_content,
            hero_content_box_posts
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

export default fetch_posts;
export { populateReactions };

