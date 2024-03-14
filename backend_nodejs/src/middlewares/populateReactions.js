import { Like, Share, Comment } from "../models/reactions.js";
import { User } from "../models/user.js";
import { generatePresignedUrls } from "../controllers/imageUrlGenerator.js";

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

export default populateReactions;